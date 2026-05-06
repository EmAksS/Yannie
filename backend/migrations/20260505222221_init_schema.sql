-- 1. Подключаем расширение для автоматической генерации UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Создаем пользовательские типы данных (ENUM) для PostgreSQL
CREATE TYPE user_role AS ENUM ('Spectator', 'Certified_Creator', 'Admin');
CREATE TYPE complaint_status AS ENUM ('Pending', 'Approved', 'Rejected');

-- 3. Создаем таблицу Пользователей (Users)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE,
    password_hash VARCHAR(255),
    wallet_address VARCHAR(255) UNIQUE,
    public_name VARCHAR(100) NOT NULL,
    role user_role NOT NULL DEFAULT 'Spectator',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Создаем таблицу Метаданных Сертификатов (Certificates_Metadata)
CREATE TABLE certificates_metadata (
    -- certificate_id не имеет DEFAULT (SERIAL/AUTOINCREMENT), 
    -- так как этот ID приходит из смарт-контракта (Блокчейна)!
    certificate_id BIGINT PRIMARY KEY, 
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    original_filename VARCHAR(255) NOT NULL,
    c2pa_manifest JSONB NOT NULL,
    thumbnail_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Создаем таблицу Жалоб (Complaints)
CREATE TABLE complaints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    certificate_id BIGINT NOT NULL REFERENCES certificates_metadata(certificate_id) ON DELETE CASCADE,
    reporter_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    reason TEXT NOT NULL,
    status complaint_status NOT NULL DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- КРИТИЧЕСКИ ВАЖНО: Защита от спама (Anti-Sybil/Review Bombing)
    -- Один пользователь может подать только одну жалобу на один сертификат
    CONSTRAINT unique_complaint_per_user UNIQUE (certificate_id, reporter_id)
);

-- 6. Создаем индексы для ускорения поиска (оптимизация БД)
CREATE INDEX idx_users_wallet ON users(wallet_address);
CREATE INDEX idx_complaints_cert_id ON complaints(certificate_id);