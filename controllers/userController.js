import userModel from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import CartModel from '../models/cartProduct.js'


//register user
const register = async (req, res) => {
    try {
        const { name, password, email } = req.body

        const user = await userModel.findOne({ email })
        if (user) {
            throw new Error("user already exists")
        }

        if (!email) {
            throw new Error("please provide emial")
        }

        if (!password) {
            throw new Error("please provide password")
        }

        if (!name) {
            throw new Error("please provide name")
        }
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)


        const payload = {
            ...req.body,
            role: "GENERAL",
            password: hashedPassword
        }
        const userData = new userModel(payload)
        const saveUser = await userData.save()
        res.status(201).json({
            message: "user registered sucessfully",
            success: true,
            error: false,
            data: saveUser
        })


    } catch (err) {

        res.json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            throw new Error("user does not exist")
        }
        if (!password) {
            throw new Error("please provide password")
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            const token = jwt.sign({ id: user._id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '3h' });
            res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'Strict' }).json({
                success: true,
                message: "Login successful",
                data: token,
                error: false
            });

        } else {
            throw new Error("please check password")
        }


    }
    catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

const userDetails = async (req, res) => {
    try {
        console.log("userId", req.userId)
        const user = await userModel.findById(req.userId)
        //console.log("user", user)
        res.status(200).json({
            data: user,
            success: true,
            error: false,
            message: "user details fetched successfully"
        })
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie("token")

        res.json({
            success: true,
            error: false,
            data: [],
            message: "logout successful"

        })
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

//get all users
const getAllUsers = async (req, res) => {
    try {
        const user = await userModel.find({})

        res.json({
            success: true,
            error: false,
            message: "all users fetched",
            data: user
        })
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}


const updateUser = async (req, res) => {
    try {
        const sessionUser = req.userId
        const { userId, email, name, role } = req.body

        const payload = {
            ...(email && { email: email }),
            ...(name && { name: name }),
            ...(role && { role: role })
        }

        const user = await userModel.findById(sessionUser)
        const updateUser = await userModel.findByIdAndUpdate(userId, payload)
        res.json({
            message: "User updated",
            success: true,
            error: false,
            data: updateUser
        })
    } catch (error) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}


//add to cart
const addToCart = async (req, res) => {
    try {
        const { productId } = req?.body
        const currentUser = req.userId

        const isProductAvailable = await CartModel.findOne({ productId })

        if (isProductAvailable) {
            return res.json({
                message: "Already exists in add to cart",
                success: false,
                error: true
            })
        }

        const payload = {
            productId: productId,
            quantity: 1,
            userId: currentUser,
        }

        const newAddToCart = new CartModel(payload)
        const saveProduct = await newAddToCart.save()

        return res.json({
            message: "Product Added",
            success: true,
            error: false,
            data: saveProduct
        })

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}




//count  cart products
const countCartproducts = async (req, res) => {
    try {
        const userId = req.userId
        const count = await CartModel.countDocuments({
            userId
        })
        res.json({
            data: count,
            message: "ok",
            success: true,
            error: false
        })
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

//add to cart view Products
const addToViewProduct = async (req, res) => {
    try {
        const currentUser = req.userId
        const allproduct = await CartModel.find({ userId: currentUser }).populate("productId")

        res.json({
            message: "all cart",
            success: true,
            error: false,
            data: allproduct
        })
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}


//update cart
const updateCartProduct = async (req, res) => {
    try {
        const currentUser = req.userId
        const cartProductId = req?.body?._id
        const qty = req.body.quantity
        const updateCart = await CartModel.updateOne({_id:cartProductId}, {
            ...(qty && { quantity: qty })
        })

        res.json({
            message: "cart updated",
            success: true,
            error: false,
            data: updateCart
        })

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

//delete a cart
const deleteCartProduct = async (req, res) => {
    try {
        const currentUser = req.userId
        const cartProductId = req.body._id

        const deleteCart = await CartModel.deleteOne({_id:cartProductId})

        res.json({
            message: "Cart Product deleted",
            success: true,
            error: false,
            data: deleteCart
        })

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

export {
    register,
    loginUser,
    userDetails,
    logout,
    getAllUsers,
    updateUser,
    addToCart,
    countCartproducts,
    addToViewProduct,
    updateCartProduct,
    deleteCartProduct
}

