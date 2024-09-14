import express from "express";
import { createProduct, deleteProduct, getProduct, updateProduct } from "../controllers/product.controller.js"; // Corrected 'deleteProduct' import

const router = express.Router();

// Use router instead of app
router.get("/", getProduct);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct); 
export default router;
