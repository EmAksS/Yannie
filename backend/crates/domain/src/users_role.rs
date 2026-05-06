use serde::{Serialize, Deserialize};

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub enum UserRole {
    Spectator,          // Обычный зритель
    CertifiedCreator,   // Доверенный автор
    Admin,              // Администратор
}

impl Default for UserRole {
    fn default() -> Self {
        UserRole::Spectator
    }
}