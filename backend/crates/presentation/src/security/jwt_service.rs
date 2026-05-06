use jsonwebtoken::{encode, decode, Header, Algorithm, Validation, EncodingKey, DecodingKey};
use serde::{Serialize, Deserialize};
use domain::uuid::Uuid;
use application::TokenService;

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub sub: Uuid,      // ID пользователя
    pub exp: usize,     // Время истечения
}

pub struct JwtService {
    secret: String,
}

impl JwtService {
    pub fn new(secret: String) -> Self { Self { secret } }
}

impl TokenService for JwtService {

    fn create_token(&self, user_id: Uuid) -> Result<String, String> {
        let expiration = chrono::Utc::now()
            .checked_add_signed(chrono::Duration::hours(24))
            .ok_or("Ошибка времени")?
            .timestamp() as usize;

        let claims = Claims { sub: user_id, exp: expiration };
        
        encode(
            &Header::default(),
            &claims,
            &EncodingKey::from_secret(self.secret.as_ref())
        ).map_err(|e| e.to_string())
    }

    fn verify_token(&self, token: &str) -> Result<Uuid, String> {
        decode::<Claims>(
            token,
            &DecodingKey::from_secret(self.secret.as_ref()),
            &Validation::default()
        )
        .map(|data| data.claims.sub)
        .map_err(|e| e.to_string())
    }
}