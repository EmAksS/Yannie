use serde::Serialize;
use utoipa::ToSchema;

// Универсальный ответ для успешных запросов
#[derive(Serialize, ToSchema)]
pub struct ApiResponse<T> {
    pub data: T,
}

// Универсальный ответ для ошибок
#[derive(Serialize, ToSchema)]
pub struct ErrorResponse {
    pub error: String,
}

pub mod auth_handler;