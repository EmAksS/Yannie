use tower_http::cors::{Any, CorsLayer, AllowOrigin};
use axum::http::{Method, header};

pub fn get_cors_layer() -> CorsLayer {
    CorsLayer::new()
        // В продакшене лучше заменить Any на конкретный домен вашего фронтенда
        .allow_origin(Any) 
        .allow_methods([Method::GET, Method::POST, Method::PUT, Method::DELETE])
        .allow_headers([
            header::CONTENT_TYPE, 
            header::AUTHORIZATION,
            header::ACCEPT
        ])
}