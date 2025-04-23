CREATE TABLE IF NOT EXISTS cines (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    cine_name VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(2) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'film_classification') THEN
        CREATE TYPE film_classification AS ENUM ('livre', '10', '12', '14', '16', '18');
    END IF;
END$$;

CREATE TABLE IF NOT EXISTS films (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    film_name VARCHAR(100) NOT NULL,
    gender VARCHAR(100) NOT NULL,
    duration INTEGER NOT NULL,
    classification film_classification NOT NULL,
    launch DATE NOT NULL,
    synopsis TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sessions (
    id SERIAL PRIMARY KEY,
    cine_id INT NOT NULL REFERENCES cines(id) ON DELETE RESTRICT,
    film_id INT NOT NULL REFERENCES films(id) ON DELETE RESTRICT,
    created_at TIMESTAMP DEFAULT NOW()
);
