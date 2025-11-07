import express from 'express'
import {addToCart, addToViewProduct, countCartproducts, deleteCartProduct, getAllUsers, loginUser, logout, register, updateCartProduct, updateUser, userDetails}  from '../controllers/userController.js';
import authMiddleware from '../middleware/auth.js';
import { getAllProducts, getCategoryProduct, getCategoryWiseProduction, getProductDetails, searchProduct, updateProduct, uploadProduct } from '../controllers/productsController.js';



const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', loginUser);
userRouter.get('/user-details', authMiddleware, userDetails)
userRouter.get('/logout', logout);


//admin panel
userRouter.get('/all-users', authMiddleware, getAllUsers)
userRouter.post('/update-user', authMiddleware, updateUser)

// product
userRouter.post("/upload-product", authMiddleware, uploadProduct)
userRouter.get("/get-all-products", getAllProducts)
userRouter.post("/update-product", authMiddleware, updateProduct)
userRouter.get("/get-category", getCategoryProduct)
userRouter.post("/get-a-category", getCategoryWiseProduction)
userRouter.post("/product-details", getProductDetails)
userRouter.get("/search-product", searchProduct)




//add to cart
userRouter.post("/addToCart", authMiddleware, addToCart)
userRouter.get("/count-cart", authMiddleware, countCartproducts)
userRouter.get("/view-cart", authMiddleware, addToViewProduct)
userRouter.post("/update-cart", authMiddleware, updateCartProduct)
userRouter.post("/delete-cart", authMiddleware, deleteCartProduct)

export default userRouter; 


