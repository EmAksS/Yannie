use serde::{Deserialize, Serialize};
use utoipa::ToSchema;

#[derive(Deserialize, ToSchema)]
pub struct RegisterRequest {
    /// Имя пользователя (никнейм)
    #[schema(example = "user_name")]
    pub username: String,
    
    /// Электронная почта для входа
    #[schema(example = "example@mail.com")]
    pub email: String,
    
    /// Пароль (минимум 6 символов)
    #[schema(example = "secret_password")]
    pub password: String,
}

#[derive(Deserialize, ToSchema)]
pub struct LoginRequest {
    /// Электронная почта для входа
    #[schema(example = "example@mail.com")]
    pub email: String,

    /// Пароль (минимум 6 символов)
    #[schema(example = "secret_password")]
    pub password: String,
}

#[derive(Serialize, ToSchema)]
pub struct TokenResponse {
    /// JWT токен для доступа к защищенным эндпоинтам
    #[schema(example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZ...")]
    pub token: String,
}