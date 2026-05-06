use domain::users_role::UserRole as DomainRole;
use sea_orm::entity::prelude::*;
use serde::{Serialize, Deserialize};

#[derive(Debug, Clone, PartialEq, Eq, EnumIter, DeriveActiveEnum, Serialize, Deserialize)]
#[sea_orm(rs_type = "String", db_type = "Enum", enum_name = "user_role")]
pub enum UserRoleDb {
    #[sea_orm(string_value = "Spectator")]
    Spectator,
    #[sea_orm(string_value = "Certified_Creator")]
    CertifiedCreator,
    #[sea_orm(string_value = "Admin")]
    Admin,
}

impl From<UserRoleDb> for DomainRole {
    fn from(db_role: UserRoleDb) -> Self {
        match db_role {
            UserRoleDb::Spectator => DomainRole::Spectator,
            UserRoleDb::CertifiedCreator => DomainRole::CertifiedCreator,
            UserRoleDb::Admin => DomainRole::Admin,
        }
    }
}

// 3. Реализация From: из типа ДОМЕНА в тип БД
// А это позволит писать user.role.into() при сохранении в базу
impl From<DomainRole> for UserRoleDb {
    fn from(domain_role: DomainRole) -> Self {
        match domain_role {
            DomainRole::Spectator => UserRoleDb::Spectator,
            DomainRole::CertifiedCreator => UserRoleDb::CertifiedCreator,
            DomainRole::Admin => UserRoleDb::Admin,
        }
    }
}