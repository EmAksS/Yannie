use application::ports::password_hasher::PasswordHasher; // Импорт нашего интерфейса
use argon2::{
    password_hash::{rand_core::OsRng, PasswordHash, PasswordHasher as ArgonHasherTrait, PasswordVerifier, SaltString},
    Argon2,
};

pub struct ArgonHasher;

impl ArgonHasher {
    pub fn new() -> Self {
        Self
    }
}

// Реализуем интерфейс из слоя Application
impl PasswordHasher for ArgonHasher {
    
    /// Превращает пароль в хеш-строку
    fn hash(&self, password: &str) -> String {
        // 1. Генерируем случайную соль (защита от радужных таблиц)
        let salt = SaltString::generate(&mut OsRng);
        
        // 2. Настраиваем алгоритм Argon2id (стандартные параметры)
        let argon2 = Argon2::default();

        // 3. Вычисляем хеш и превращаем его в строку формата PHC 
        // (содержит алгоритм, параметры, соль и сам хеш в одной строке)
        argon2
            .hash_password(password.as_bytes(), &salt)
            .expect("Ошибка при хешировании пароля") // В реальности лучше обработать ошибку
            .to_string()
    }

    /// Проверяет, подходит ли пароль к хешу
    fn verify(&self, password: &str, hash: &str) -> bool {
        // 1. Парсим строку хеша из базы данных
        let parsed_hash = match PasswordHash::new(hash) {
            Ok(h) => h,
            Err(_) => return false, // Если хеш в базе "битый", проверка не прошла
        };

        // 2. Проверяем пароль с помощью Argon2
        Argon2::default()
            .verify_password(password.as_bytes(), &parsed_hash)
            .is_ok() // Возвращает true, если пароль верный
    }
}