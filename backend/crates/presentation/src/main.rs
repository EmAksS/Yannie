pub mod security;
pub mod web;
pub mod handlers;

mod dto;

use std::sync::Arc;
use axum::{routing::post, Router};
use infrastructure::{db::init_db, SeaOrmUserRepository};
use security::argon_hasher::ArgonHasher;
use security::jwt_service::JwtService;
use application::AuthService;
use utoipa::OpenApi;
use utoipa_swagger_ui::SwaggerUi;

// Собираем документацию Swagger
#[derive(OpenApi)]
#[openapi(
    paths(
        handlers::auth_handler::register_handler,
        handlers::auth_handler::login_handler),
    components(
        schemas(
            dto::auth::RegisterRequest,
            dto::auth::LoginRequest,
            dto::auth::TokenResponse
        ), 
    )
)]
struct ApiDoc;

#[tokio::main]
async fn main() {
    // 1. Инициализация конфигов
    dotenvy::dotenv().ok();
    let db_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    // Дальше прокидываем db_conn в репозитории
    let db_conn = init_db(&db_url)
        .await
        .expect("Не удалось подключиться к базе данных");

    let jwt_secret = std::env::var("JWT_SECRET").expect("JWT_SECRET must be set");

    // 3. Сборка слоев (Dependency Injection)
    let user_repo = Arc::new(SeaOrmUserRepository::new(db_conn));
    let hasher = Arc::new(ArgonHasher::new());
    let token_service = Arc::new(JwtService::new(jwt_secret));

    // Инициализируем бизнес-логику, передавая ей инструменты
    let auth_service = Arc::new(AuthService::new(user_repo, hasher, token_service));

    // 4. Настройка веб-сервера
    let app = Router::new()
        .route("/api/auth/register", post(handlers::auth_handler::register_handler))
        .route("/api/auth/login", post(handlers::auth_handler::login_handler))
        // Добавляем Swagger UI
        .merge(SwaggerUi::new("/swagger-ui").url("/api-docs/openapi.json", ApiDoc::openapi()))
        // Передаем AuthService в состояние Axum
        .with_state(auth_service)
        
        .layer(web::cors::get_cors_layer());

    // 5. Запуск
    let listener = tokio::net::TcpListener::bind("0.0.0.0:8000").await.unwrap();
    println!("🚀 Server started at http://localhost:8000");
    println!("📖 Swagger UI at http://localhost:8000/swagger-ui");
    
    axum::serve(listener, app).await.unwrap();
}