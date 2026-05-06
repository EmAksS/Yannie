use serde::{Serialize, Deserialize};
use uuid::Uuid;

use crate::users_role::UserRole;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct User {
    pub id: Uuid,
    pub email: Option<String>,
    pub password_hash: Option<String>,
    pub wallet_address: Option<String>,
    pub public_name: String,
    pub role: UserRole,
}

impl User {
    // Конструктор для Email
    pub fn new_from_email(email: String, hash: String, name: String) -> Self {
        Self {
            id: uuid::Uuid::new_v4(),
            email: Some(email),
            password_hash: Some(hash),
            wallet_address: None,
            public_name: name,
            role: UserRole::Spectator,
        }
    }

    // Конструктор для Wallet
    pub fn new_from_wallet(address: String, name: String) -> Self {
        Self {
            id: uuid::Uuid::new_v4(),
            email: None,
            password_hash: None,
            wallet_address: Some(address),
            public_name: name,
            role: UserRole::CertifiedCreator, // Например, по кошельку сразу даем роль Автора
        }
    }
}

pub enum DomainError {
    InvalidEmail,
    WeakPassword,
    UserAlreadyExists,
    Internal(String),
}
