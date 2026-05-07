use axum::{extract::State, Json, http::StatusCode};
use domain::commands::RegisterCommand;
use std::sync::Arc;
use application::AuthService; // Импортируем бизнес-логику
use crate::{dto::auth::{LoginRequest, RegisterRequest, TokenResponse}, handlers::ApiResponse}; // Импортируем DTO

// Хендлер регистрации
#[utoipa::path(
    post,
    path = "/api/auth/register",
    request_body = RegisterRequest,
    responses((status = 201, description = "Пользователь создан", body = ApiResponse<TokenResponse>))
)]
pub async fn register_handler(
    State(auth_service): State<Arc<AuthService>>, // Достаем сервис из состояния
    Json(payload): Json<RegisterRequest>,         // Распаковываем JSON
) -> Result<( StatusCode, Json<ApiResponse<TokenResponse>> ), (StatusCode, String)> {
    
    // Передаем данные в сервис (слой Application)

    let command = RegisterCommand::Email {
        email: payload.email,
        raw_password: payload.password,
        public_name: payload.username,
    };

    let token = auth_service
        .register(command)
        .await
        .map_err(|e| (StatusCode::BAD_REQUEST, e))?; // Если ошибка, возвращаем 400

    let token_data = TokenResponse { token };

    Ok((StatusCode::CREATED,Json(ApiResponse { data: token_data })))
}

// Хендлер входа
#[utoipa::path(
    post,
    path = "/api/auth/login",
    request_body = LoginRequest,
    responses((status = 200, description = "Пользователь успешно зашел по email", body = ApiResponse<TokenResponse>))
)]
pub async fn login_handler(
    State(auth_service): State<Arc<AuthService>>,
    Json(payload): Json<LoginRequest>,
) -> Result<Json<ApiResponse<TokenResponse>>, (StatusCode, String)> {
    
    // Вызываем логику входа, получаем токен
    let token = auth_service
        .login(payload.email, payload.password)
        .await
        .map_err(|_| (StatusCode::UNAUTHORIZED, "Ошибка входа".to_string()))?;

    
    let token_data = TokenResponse { token };

    Ok( Json(ApiResponse { data: token_data }) )
}