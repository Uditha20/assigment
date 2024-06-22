import { Router } from "express";
import multer from 'multer'
const router = Router();
import path from "path";
import { addProduct, deleteProduct, getAllproduct, oneProduct, productUpdate } from "../controller/ProductController.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Make sure this directory exists or is created
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Modify the route to include multer middleware
router.post(
    "/addProduct",
    upload.fields([
      { name: "mainImage", maxCount: 1 },
      { name: "additionalImages", maxCount: 3 },
    ]),
    addProduct
  );
router.route("/getAll").get(getAllproduct);
router.route("/delete/:id").patch(deleteProduct);
router.route("/product/:id").get(oneProduct);
router.route("/updateproduct/:id").patch(upload.single('image'), productUpdate);









export default router;