import express from "express";
const router = express.Router();
import { createCategory, listCategory, readCategory, removeCategory, updateCategory } from "../controllers/categoryController.js";
import { authenticate, authorizedAdmin } from "../middlewares/authMiddleware.js";
router.route('/').post(authenticate, authorizedAdmin, createCategory);
router.route('/:categoryId').put(authenticate, authorizedAdmin, updateCategory);
router.route('/:categoryId').delete(authenticate, authorizedAdmin, removeCategory);
router.route('/categories').get(authenticate, authorizedAdmin, listCategory);
router.route('/:id').get(readCategory);

export default router;