import UserModel from "../models/UserModel.js";
import argon2 from "argon2";
import sequelize from "sequelize";
import db from "../config/Database.js"

// get all Users
export const getUser = async(req, res) => {
    try {
        const response = await UserModel.findAll({
            attributes: ['uuid', 'name', 'email', 'role']
        });
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({
            msg: error.message
        })
    }
}

// get id User
export const getUserId = async(req, res) => {
    try {
        const response = await UserModel.findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.params.id,
            }
        });
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({
            msg: error.message
        })
    }
}

// create User
export const createUser = async(req, res) => {
    const {
        name, 
        email, 
        password,
        confPassword,
        role
    } = req.body
    if(password !== confPassword) return res.status(400).json(
        {msg: "Password tidak sama"}
    )
    const hashPass = await argon2.hash(password)
    try {
        await UserModel.create({
            name: name,
            email: email, 
            password: hashPass,
            role: role
        })
        res.status(201).json({
            msg: "Register berhasil"
        })
    } catch (error) {
        res.status(400).json({
            msg: error.message
        })
    }
}

// update User
export const updateUser = async(req, res) => {
    const user = await UserModel.findOne({
        where: {
            uuid: req.params.id,
        }
    })
    if(!user) return res.status(400).json(
        {
            msg: "User tidak ditemukan!"
        }
    )
    const {name, email, password, confPassword, role} = req.body
    let hashPassword
    if(password === '' || password === null){
        hashPassword = user.password
    } else {
        hashPassword = await argon2.hash(password)
    }

    if(password !==confPassword) return res.status(400).json({
        msg: "Password tidak sesuai, ulangi kembali"
    })

    try {
        UserModel.update({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        }, {
            where: {
                id: user.id
            }
        })
        res.status(200).json({
            msg: "Update user success!"
        })
    } catch (error) {   
        res.status(400).json({
            msg: error.message
        })
    }
}

// delete User
export const deleteUser = async(req, res) => {
    const user = await UserModel.findOne({
        where: {
            uuid: req.params.id,
        }
    })

    if(!user) return res.status(400).json(
        {
            msg: "User tidak ditemukan!"
        }
    )

    try {
        UserModel.destroy({
            where: {
                id: user.id
            }
        })
        res.status(200).json({
            msg: "Hapus user success!"
        })
    } catch (error) {   
        res.status(400).json({
            msg: error.message
        })
    }
}

// jumlah user
export const totalUser = async(req, res) => {
    try {
        const response = await db.query('SELECT COUNT(id) as jlh FROM users');
        return res.status(200).json(response)

    } catch (error) {
        return res.status(404).json({msg: error.message})
    }
}