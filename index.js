import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { db } from './config/db.js';

// Load environment variables from a .env file
dotenv.config();

// Create an instance of Express
const app = express();

// Use express.json() middleware for parsing JSON bodies
app.use(express.json());

// Use CORS middleware for enabling Cross-Origin Resource Sharing
app.use(cors());

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Define the port number
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
