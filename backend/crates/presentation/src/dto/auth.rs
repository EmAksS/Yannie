use serde::Deserialize;
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
    #[schema(example = "example@mail.com")]
    pub email: String,
    pub password: String,
}