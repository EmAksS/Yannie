use axum::{extract::State, Json, http::StatusCode};
use domain::commands::RegisterCommand;
use std::sync::Arc;
use application::AuthService; // Импортируем бизнес-логику
use crate::dto::auth::{RegisterRequest, LoginRequest}; // Импортируем DTO

// Хендлер регистрации
#[utoipa::path(
    post,
    path = "/api/auth/register",
    request_body = RegisterRequest,
    responses((status = 201, description = "Пользователь создан"))
)]
pub async fn register_handler(
    State(auth_service): State<Arc<AuthService>>, // Достаем сервис из состояния
    Json(payload): Json<RegisterRequest>,         // Распаковываем JSON
) -> Result<StatusCode, (StatusCode, String)> {
    
    // Передаем данные в сервис (слой Application)

    let command = RegisterCommand::Email {
        email: payload.email,
        raw_password: payload.password,
        public_name: payload.username,
    };

    auth_service
        .register(command)
        .await
        .map_err(|e| (StatusCode::BAD_REQUEST, e))?; // Если ошибка, возвращаем 400

    Ok(StatusCode::CREATED)
}

// Хендлер входа
pub async fn login_handler(
    State(auth_service): State<Arc<AuthService>>,
    Json(payload): Json<LoginRequest>,
) -> Result<Json<String>, (StatusCode, String)> {
    
    // Вызываем логику входа, получаем токен
    let token = auth_service
        .login(payload.email, payload.password)
        .await
        .map_err(|_| (StatusCode::UNAUTHORIZED, "Ошибка входа".to_string()))?;

    // Возвращаем токен в виде JSON
    Ok(Json(token))
}