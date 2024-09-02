import {Router} from "express"
import { create, deleteProduct, getAll, getProductById, updateProduct } from "../controller/product";

const router = Router();
router.get(`/products`,getAll);
router.get(`/products/:id`,getProductById);
router.post(`/products`,create);
router.delete(`/products/:id`,deleteProduct);
router.put(`/products/:id`,updateProduct);


export default router