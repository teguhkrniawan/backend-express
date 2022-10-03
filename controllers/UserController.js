import UserModel from "../models/UserModel.js";
import argon2 from "argon2";
import { response } from "express";

// get all Users
export const getUser = async(req, res) => {
    try {
        const repsonse = await UserModel.findAll();
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
}

// get id User
export const getUserId = (req, res) => {

}

// create User
export const createUser = (req, res) => {

}

// update User
export const updateUser = (req, res) => {

}

// delete User
export const deleteUser = (req, res) => {

}