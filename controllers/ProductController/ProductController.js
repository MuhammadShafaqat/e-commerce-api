const { default: mongoose } = require('mongoose');
const CategoryModel = require('../../models/CategoryModel');
const ProductModel = require('../../models/ProductModel');

const getProduct = async (req,res)=>{
      try {
            // const productList = await ProductModel.find();
            const productList = await ProductModel.find().populate('category');
            if (!productList) {
                return res.status(404).json({success: false, message: 'product not found'})
            }
        return res.status(200).json(productList)
      } catch (error) {
        console.error(error);
        return res.status(500).json({success: false, message: 'Internal server error'})
      }
}
// get for a single product
const getSingleProduct = async (req, res)=>{
                    try {                 
                const product = await ProductModel.findById(req.params.id).populate('category');
                    if (!product) {
                    return res.status(404).json({success:false, message:'product not found'})     
                        }
                    return res.status(200).json(product)
                } catch (error) {
                  return res.status(500).json({success:true,message:'Internal server error'})      
                    }
}
//delete product request 
const deleteProduct = async (req, res)=>{
            try {
                const product = await ProductModel.findByIdAndDelete(req.params.id);
                if (!product) {
            return res.status(404).json({success:false,message:'product not found'})
                }
            return res.status(202).json({success: true, message: 'product deleted successfully'})
            } catch (error) {
                console.error(error);
            return res.status(500).json({success:false, message:'Internal server error'})
            }
}

// post request for product
const createProduct = async (req,res)=>{
        try {
            const category = await CategoryModel.findById(req.body.category);
            if(!category) return res.status(400).json({success:false, message:'Invalid category'})

            const product = await ProductModel.create(req.body);
            if(!product){
                // res.status(400).json({ error: 'Invalid request data' });
            return  res.status(400).json({success: false, message: 'Product can not be created'})
            }
            return res.status(201).json({success: true, message:'Product created successfully'})
            // return res.status(201).send(Product)
        } catch (error) {
            console.error(error);
            return res.status(500).json({success: false, message:'Internal server error'})

        }
}
//put request to update the product 
const updateProduct = async (req,res)=>{
try {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(500).json({success:false,message:'Invalid object Id'})
    }
    const category = await CategoryModel.findById(req.body.category);
    if (!category) {
        return res.status(400).json({success:false,message:'Invalid category'})
    }
    const updateProduct = await ProductModel.findByIdAndUpdate(req.params.id,req.body,{new: true});
    if (!updateProduct) {
        return res.status(404).json({success:false,message:'product not founf'});
    }
    return res.send(updateProduct)
} catch (error) {
    console.error(error);
    return res.status(500).json({success:false,message:'Internal server error'})
}
}
// get request for count of products
const countProducts = async (req,res)=>{
        try {
            const productsCount = await ProductModel.countDocuments();
            if (!productsCount) {
            return res.status(404).json({success:false,message:"products not exists"})
            }
            return res.status(200).json({success:true,count:productsCount,message:`stock has ${productsCount} products`})
        } catch (error) {
            console.error(error)
            return res.status(500).json({success:false, message:'Internal server error'})
        }
}
// In order to get featured products
const featureProducts = async (req,res)=>{
        try {
            const products = await ProductModel.find({isFeatured: true});
            if (!products) {
            return res.status(404).json({success:false, message:'there is no featured products'});
            }
            return res.status(200).json(products);
        } catch (error) {
            console.error(error)
            return res.status(500).status({success:false, message:'Internal server error'})
        }
}
// In order to count the featured products 
const countFeature = async (req,res)=>{
   try {
    const countFeature = await ProductModel.countDocuments({isFeatured:true});
    if (!countFeature) {
        return res.status(404).json({success:false,message:"no feature product found"})
    }
    return res.status(200).json({success:true,message:`there are ${countFeature} featured products`})
   } catch (error) {
    console.error(error);
    return res.status(500).json({success:false,message:'Internal server error'})
   }
}
// In order to limit the number of featured products
const featuredLimit = async (req,res)=>{
          try {
            const count = req.params.count? req.params.count:0;
            const products = await ProductModel.find({isFeatured:true}).limit(count);
            if (!products) {
             return res.status(404).json({success:false,message:'no featured products found'})
            }
            return res.status(200).json(products);
          } catch (error) {
            console.error(error);
            return res.status(500).json({success:false,message:'Internal server error'})
          }
}

module.exports = {createProduct,getProduct,getSingleProduct,deleteProduct,updateProduct,countProducts,featureProducts,
    featuredLimit,countFeature}