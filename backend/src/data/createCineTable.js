import pool from "../config/db.js";

const createCineTable = async () => {
  const queryText = `
        CREATE TABLE IF NOT EXISTS cines (
            id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            cine_name VARCHAR(100) NOT NULL,
            city VARCHAR(100) NOT NULL,
            state VARCHAR(2) NOT NULL,
            created_at TIMESTAMP DEFAULT NOW()
        );
    `;
    try {
        await pool.query(queryText)
        console.log("Cine table created if not exists")
    } catch (error) {
        console.log("Error creating cine table : ", error)
    }
};

export default createCineTable;
