import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { db } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";

// Load environment variables from a .env file
dotenv.config();

// Create an instance of Express
const app = express();

// Use express.json() middleware for parsing JSON bodies
app.use(express.json());

// Use CORS middleware for enabling Cross-Origin Resource Sharing
app.use(cors());

// Define a route for the root URL
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use('/api/user' , authRoutes)

app.use(notFound);
app.use(errorHandler);

// Define the port number
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
