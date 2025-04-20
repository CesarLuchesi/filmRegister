import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import cineRoutes from "./routes/cineRoutes.js";
import filmsRoutes from "./routes/filmsRoutes.js";
import sessionsRoutes from "./routes/sessionsRoutes.js";
import errorhandling from "./middlewares/errorHandler.js";
import createCineTable from "./data/createCineTable.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

//MIDDLEWARE
app.use(express.json());
app.use(cors());

//Routes
app.use("/api", cineRoutes);
app.use("/api", filmsRoutes);
app.use("/api", sessionsRoutes);

//Error handling middleware
app.use(errorhandling);

//create tables if not exists
createCineTable()

//Testing PG connection

app.get("/", async (req, res) => {
  console.log("Starting the server...");
  const result = await pool.query("SELECT current_database()");
  console.log("Ending the server...");
  res.send(`The databse name is : ${result.rows[0].current_database}`);
});

//Server running
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
