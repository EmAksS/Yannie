use domain::uuid::Uuid;
pub trait TokenService: Send + Sync {
    /// Генерирует токен для пользователя
    fn create_token(&self, user_id: Uuid) -> Result<String, String>;
    
    /// Проверяет токен и возвращает ID пользователя
    fn verify_token(&self, token: &str) -> Result<Uuid, String>;
}