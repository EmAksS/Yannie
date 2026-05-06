pub mod ports;
pub mod services;

// Для удобства делаем ре-экспорт основных типов
pub use ports::user_repository::UserRepository;
pub use ports::password_hasher::PasswordHasher;
pub use ports::token_service::TokenService;
pub use services::auth_service::AuthService;


