const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
            id: Schema.Types.ObjectId,
            name:{
                type: String,
                required:true
            },
            description:{
                type:String,
                required: true
            },
            richDescription:{
                type: String,
                default:''
            },
            image:{
                type: String,
                default:''
            },
            images: [{
                type: String
            }],
            brand: {
                type: String,
                default: ''
            },
            price: {
                type:Number,
                default:0
            },
            category:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Categories',
            required:true
            },
            countInStock: {
            type:Number,
            required:true,
            min:0,
            max:225
            },
            ratting: {
                type: Number,
                default: 0
            },
            numReviews:{
                type: Number,
                default:0
            },
            isFeatured:{
                type: Boolean,
                default: false
            },
            dateCreated:{
                type: Date,
                default: Date.now
            },           

})

const ProductModel = mongoose.model('Products', productSchema);
module.exports = ProductModel