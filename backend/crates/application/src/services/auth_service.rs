use std::sync::Arc;
use domain::commands::RegisterCommand;
use domain::user::User;
use crate::ports::user_repository::UserRepository;
use crate::ports::password_hasher::PasswordHasher;
use crate::ports::token_service::TokenService; // 1. Импортируем новый порт

pub struct AuthService {
    repo: Arc<dyn UserRepository>,
    hasher: Arc<dyn PasswordHasher>,
    token_service: Arc<dyn TokenService>, // 2. Добавляем поле для работы с токенами
}

impl AuthService {
    pub fn new(
        repo: Arc<dyn UserRepository>, 
        hasher: Arc<dyn PasswordHasher>,
        token_service: Arc<dyn TokenService>, // 3. Обновляем конструктор
    ) -> Self {
        Self { repo, hasher, token_service }
    }

    // Сценарий регистрации (остается почти таким же)
    pub async fn register(&self, command: RegisterCommand) -> Result<(), String> {

        let new_user = match command {
            RegisterCommand::Email { email, raw_password, public_name } => {
                if self.repo.find_by_email(&email).await?.is_some() {
                    return Err("Пользователь с таким email уже существует".into());
                }
                let hashed_password = self.hasher.hash(&raw_password);
                User::new_from_email(email, hashed_password, public_name)
            },
            RegisterCommand::Wallet { address, public_name } => {
                User::new_from_wallet(address, public_name)
            },
        };


        self.repo.save(new_user).await
    }

    // Сценарий входа (теперь возвращает ТОКЕН)
    pub async fn login(&self, email: String, raw_pass: String) -> Result<String, String> {
        // 1. Ищем пользователя
        let user = self.repo.find_by_email(&email).await?
            .ok_or("Пользователь не найден")?;

        let stored_hash = user.password_hash.as_ref()
                .ok_or("Для этого аккаунта не установлен пароль. Войдите через кошелек")?;

        // 2. Проверяем пароль
        if !self.hasher.verify(&raw_pass, stored_hash) {
            return Err("Неверный пароль".into());
        }

        // 3. Генерируем JWT токен через интерфейс
        // Мы передаем ID пользователя, а сервис токенов превращает его в зашифрованную строку
        let token = self.token_service.create_token(user.id)?;

        Ok(token)
    }
}