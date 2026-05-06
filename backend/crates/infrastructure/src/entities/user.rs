use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};
use chrono::{DateTime, Utc};

use crate::entities::user_role::UserRoleDb;

#[derive(Clone, Debug, PartialEq, DeriveEntityModel, Serialize, Deserialize)]
#[sea_orm(table_name = "users")] // Имя таблицы в Postgres
pub struct Model {
    #[sea_orm(primary_key, auto_increment = false)]
    pub id: Uuid,
    #[sea_orm(unique)]
    pub email: Option<String>,
    pub password_hash: Option<String>,
    #[sea_orm(unique)]
    pub wallet_address: Option<String>,
    pub public_name: String,
    pub role: UserRoleDb, // SeaORM сам поймет, как это сохранить
    pub created_at: DateTime<Utc>,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {}

impl ActiveModelBehavior for ActiveModel {}

