use async_trait::async_trait;
use domain::user::User; // Берем сущность из слоя Domain

#[async_trait]
pub trait UserRepository: Send + Sync {
    async fn find_by_email(&self, email: &str) -> Result<Option<User>, String>;
    async fn save(&self, user: User) -> Result<(), String>;
}