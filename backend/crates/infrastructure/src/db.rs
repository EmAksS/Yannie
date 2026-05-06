use sea_orm::{ConnectOptions, Database, DatabaseConnection, DbErr};
use std::time::Duration;

pub async fn connect_db(url: &str) -> DatabaseConnection {
    Database::connect(url).await.expect("Не удалось подключиться к БД")
}

pub async fn init_db(database_url: &str) -> Result<DatabaseConnection, DbErr> {
    // 1. Создаем параметры подключения
    let mut opt = ConnectOptions::new(database_url.to_owned());

    // 2. Настраиваем пул соединений
    opt.max_connections(20)          // Максимальное количество одновременных запросов к БД
       .min_connections(5)           // Сколько соединений всегда держать открытыми
       .connect_timeout(Duration::from_secs(8)) // Таймаут при первом подключении
       .acquire_timeout(Duration::from_secs(8)) // Таймаут на получение свободного соединения из пула
       .idle_timeout(Duration::from_secs(10))   // Закрывать соединение, если оно простаивает 10 сек
       .max_lifetime(Duration::from_secs(30 * 60)) // Обновлять соединение каждые 30 минут
       .sqlx_logging(true);          // Выводить SQL-запросы в консоль (удобно для отладки)

    // 3. Пытаемся подключиться
    let db = Database::connect(opt).await?;

    println!("✅ База данных подключена успешно!");

    Ok(db)
}