import mongoose from "mongoose";

const CartSchema = mongoose.Schema({
    productId: {
        ref:'Product',
        type: String
    },
    quantity: Number,
    userId: String,

},{
    timestamps : true
})

const CartModel = mongoose.model("addToCart", CartSchema)

export default CartModel;