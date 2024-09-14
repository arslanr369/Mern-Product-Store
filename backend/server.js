import express from 'express';
import cors from 'cors';  // Import cors package
import { connectDB } from './config/db.js';
import productRoutes from "./routes/product.route.js";
import path from "path";

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

// Use CORS middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',  // Use env variable for origin
}));

// Parse JSON requests
app.use(express.json());

// Set up routes
app.use("/api/products", productRoutes);

// Serve static files in production
if (process.env.NODE_ENV === "production") {  // Corrected process.env.NODE_ENV
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  app.get("*", (req, res) => {  // Corrected arrow function
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));  // Corrected sendFile
  });
}

// Connect to database and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to the database:', err);
  process.exit(1);
});
