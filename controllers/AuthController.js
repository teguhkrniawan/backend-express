
import UserModel from "../models/UserModel.js"
import argon2 from "argon2"

export const login = async(req, res) => {

    if(req.body.email == '' || req.body.password == ''){
        return res.status(404).json({msg: 'email dan password tidak boleh kosong!'})
    }

    const user = await UserModel.findOne({
        where: {
            email: req.body.email
        }
    })
    
    if(!user) return res.status(404).json({
        msg: "Email tidak terdaftar!"
    })

    // mathcing ?
    const match = await argon2.verify(user.password, req.body.password);
    if(!match) return res.status(404).json({
        msg: "Autentikasi gagal! cek kembali email dan passwordmu"
    })

    // apabila matching
    req.session.userId = user.uuid
    
    const uuid = user.uuid
    const name = user.name
    const email = user.email
    const role = user.role

    res.status(200).json({
            uuid,
            name,
            email,
            role
        })
}

export const logout = async(req, res) => {
    req.session.destroy((err) => {
        if(err) return res.status(401).json({msg: "Gagal untuk logout"})
        res.status(200).json({msg: "Berhasil logout"})
    }) 
}

export const me = async(req, res) => {
    if(!req.session.userId){
        return res.status(404).json({
            msg: "Mohon login terlebih dahulu"
        })
    }

    const user = await UserModel.findOne({
        attributes: ['uuid', 'name', 'email', 'role'],
        where: {
            uuid: req.session.userId
        }
    })

    if(!user) return res.status(404).json({
        msg: "User tidak ditemukan!"
    })

    res.status(200).json(user);
}