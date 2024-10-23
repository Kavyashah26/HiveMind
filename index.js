import express from "express";
import cors from "cors"; // Enable CORS
import rateLimit from "express-rate-limit"; // Rate limiting
import { errorMiddleware } from "./middlewares/errors.js";
import rootRoutes from "./src/routes/index.js";
import connectDb from "./src/db/index.js";
import dotenv from "dotenv";
dotenv.config(); 

const app = express();

// Enable CORS for all origins
app.use(cors());

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later."
});

app.use(limiter);

// Body parser
app.use(express.json());

// Routes
app.use('/api', rootRoutes);

// Error handling middleware
app.use(errorMiddleware);

// Test route
  app.get('/', (req, res) => {
    res.send('Working');
  });

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App working on port ${PORT}`);
});

// Display JWT Secret in console (for testing purposes)
console.log(process.env.JWT_SECRET);

// Connect to the database
connectDb();
