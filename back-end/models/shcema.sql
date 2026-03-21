CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE users(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    hash_password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE problems(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    constraints JSONB,
    examples JSONB,
    output_type VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE testcases(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    problem_id UUID REFERENCES problems(id) ON DELETE CASCADE,
    display_input TEXT,
    input TEXT NOT NULL,
    expected_output TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE submissions(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    problem_id UUID REFERENCES problems(id) ON DELETE CASCADE,
    code_text TEXT NOT NULL,
    language VARCHAR(20) DEFAULT 'cpp',
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE ai_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    submission_id UUID REFERENCES submissions(id) ON DELETE CASCADE,
    problem_id UUID REFERENCES problems(id) ON DELETE CASCADE,
    review TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
