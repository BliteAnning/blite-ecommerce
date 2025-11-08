import { uploadPermission } from "../helpers/permission.js"
import CartModel from "../models/cartProduct.js"
import productModel from "../models/productModel.js"

export const uploadProduct = async (req, res) => {
    try {
        const sessionUserid = req.userId
        if (!uploadPermission(sessionUserid)) {
            throw new Error("Permission Denied")
        }
        const uploadProduct = new productModel(req.body)
        const saveProduct = await uploadProduct.save()

        res.status(201).json({
            message: "Product uploaded successfully",
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


export const getAllProducts = async (req, res) => {
    try {
        const allProducts = await productModel.find({}).sort({ createdAt: -1 })
        res.json({
            message: "products fetched",
            success: true,
            error: false,
            data: allProducts
        })
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

export const updateProduct = async (req, res) => {
    try {
        if (!uploadPermission(req.userId)) {
            throw new Error("Permission Denied")
        }
        const { _id, ...resBody } = req.body
        const update = await productModel.findByIdAndUpdate(_id, resBody)
        res.json({
            message: "products updated",
            success: true,
            error: false,
            data: update
        })
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}



export const getCategoryProduct = async (req, res) => {
    try {
        const product = await productModel.distinct("category")
        // console.log("category", product)

        //array to store one product from each category
        const productByCategory = []

        for (const category of product) {
            const product = await productModel.findOne({ category })

            if (product) {
                productByCategory.push(product)
            }
        }
        res.json({
            message: "category product",
            success: true,
            data: productByCategory,
            error: false
        })



    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}


//get category wise product
export const getCategoryWiseProduction = async (req, res) => {
    try {
        const { category } = req?.body || req?.query
        const product = await productModel.find({ category })

        res.json({
            data: product,
            success: true,
            error: false,
            message: "category products fetched"
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}


//get a product detail
export const getProductDetails = async (req, res) => {
    try {
        const { productId } = req.body

        const product = await productModel.findById(productId)

        res.json({
            data: product,
            success: true,
            message: "Product Details",
            error: false
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}



//search product
export const searchProduct = async (req, res) => {
    try {
        const query = req.query.q
        const regex = new RegExp(query, "i", "g")
        const product = await productModel.find({
            "$or": [
                {
                    productName: regex
                },
                {
                    category: regex
                }
            ]
        })

        res.json({
            data: product,
            message: "search product",
            success: true,
            error: false
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

//filter product
export const filterProduct = async (req, res) => {
    try {
         const catList = req?.body?.category || []
         const product = await productModel.find({
          category:{
            "$in": catList
          }
         })

         res.json({
            message:"filtered category",
            success:true,
            error: false,
            data:product
         })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}