import ProductModel from "../models/ProductModel.js"
import Users from "../models/UserModel.js";
import {Op} from "sequelize";

// get all Products
export const getProduct = async(req, res) => {
    try {
        let response;
        if(req.role === 'admin'){
            response = await ProductModel.findAll({
                include: [{
                    model: Users
                }]
            })
        }
        else {
            response = await ProductModel.findAll({
                where: {
                    userId: req.userId
                },
                include: [{
                    model: Users
                }]
            })
        }
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({msg: error.message})
    }
}

// get id Product
export const getProductId = (req, res) => {

}

// create Product
export const createProduct = async(req, res) => {
    console.log('userId', req.userId)
    
    const {name, price} = req.body
    try {
        await ProductModel.create({
            nameProduct: name,
            price: price,
            userId: req.userId
        })
        return res.status(200).json({msg: "Product Created Successfuly!"})
    } catch (error) {
        return res.status(404).json({msg: error.message})
    }
}

// update Product
export const updateProduct = (req, res) => {

}

// delete Product
export const deleteProduct = async(req, res) => {
    try {
        const product = await ProductModel.findOne({
            where: {
                uuid: req.params.id
            }
        })

        // apabila tidak ada product yang ditemukan
        if(!product) return res.status(404).json({msg: "Produk tidak ditemukan"});

        const {name, price} = req.body;
        if(req.role === 'admin'){
            await ProductModel.destroy({
                where: {
                    id: product.id
                }
            })
            res.status(200).json({msg: 'product deleted'})
        }
        else {
            // apabila produk tsb bukan milik si pengguna
            if(req.userId !== product.userId) return res.status(404).json({msg: 'akses ditolak'});
            await ProductModel.update({name, price}, {
                where: {
                    [Op.and]:[{id: product.id}, {userId: req.userId}]
                }
            });
            return res.status(200).json({msg: "Product delete successfuly"})
        }
    } catch (error) {
        return res.status(404).json({msg: error.message})
    }
}