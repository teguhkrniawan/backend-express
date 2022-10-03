
import UserModel from "../models/UserModel.js"
import argon2 from "argon2"

export const login = async(req, res) => {
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
    if(!match) return res.status(400).json({
        msg: "Gagal login!"
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