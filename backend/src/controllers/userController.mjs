import userModel from "../models/userModel.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { secretToken } from "../../config.mjs";

const registerUser = async (req, res) => {
    try {
        let { name, email, password, role, phone} = req.body;
        console.log(req.body);
        if(!name){
            return res.status(400).send({ status: "failed", message: "name is required" });
        }
        if(!email){
            return res.status(400).send({ status: "failed", message: "email is required" });
        }
        if(!password){
            return res.status(400).send({ status: "failed", message: "password is required" });
        }
        if(!role){
            return res.status(400).send({ status: "failed", message: "role is required" });
        }
        if(!phone){
            return res.status(400).send({ status: "failed", message: "phone is required" });
        }
        //store hashed password
        password = await bcrypt.hash(password, 10);
        //store user in db
        const newUser = await userModel.create({
            name,
            email,
            password,
            role,
            phone
        });
        return res.status(201).send({ status: "ok", message: "user registered successfully"});

    } catch (error) {
        if(error.message.includes("validation")){
            return res.status(400).send({ status: "failed", message: error.message });
        }else if(error.message.includes("duplicate")){
            return res.status(400).send({ status: "failed", message: error.message });
        }else{
            return res.status(500).send({ status: "failed", message: error.message });
        } 
    }   
};

const loginUser = async (req, res) => {
    //login logic here
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({email:email});
        if(!user){
            return res.status(400).send({ status: "failed", message: "user not found" });
        }
        let hashCode = user.password;
        let check = await bcrypt.compare(password, hashCode);
        if(!check){
            return res.status(400).send({ status: "failed", message: "invalid credentials" });
        }

        const token = jwt.sign({role: user.role,id:user._id}, secretToken, {expiresIn:"24h"});
        
        if(!token){
            return res.status(500).send({ status: "failed", message: "token generation failed" });
        }
        // req.header.setHeader("auth-token", token);
        let data = {token: token, role: user.role,name:user.name,email:user.email,phone:user.phone,id:user._id};
        return res.status(200).send({ status: "ok", data: data });
    } catch (error) {
        if(error.message.includes("validation")){
            return res.status(400).send({ status: "failed", message: error.message });
        }else if(error.message.includes("duplicate")){
            return res.status(400).send({ status: "failed", message: error.message });
        }else{
            return res.status(500).send({ status: "failed", message: error.message });
        } 
    }
}

const updateUser = async(req,res)=>{
    try {
        const {email,name} = req.body;
        const updatedData = await userModel.updateOne({email: email,},{$set:{name:name}});
        return res.send({status:"ok",data:updatedData});
    } catch (error) {
        if(error.message.includes("validation")){
            return res.status(400).send({ status: "failed", message: error.message });
        }else if(error.message.includes("duplicate")){
            return res.status(400).send({ status: "failed", message: error.message });
        }else{
            return res.status(500).send({ status: "failed", message: error.message });
        }
    }
}

const getProfile = async(req,res)=>{
    try {
        const id = req.params.id;
        const user = await userModel.findById(id).select("-password");
        if(!user){
            return res.status(404).send({status:"failed",message:"User not found"});
        }
        return res.status(200).send({status:"ok",data:user});
    } catch (error) {
        return res.status(500).send({status:"failed",message:error.message});
    }
}

export { registerUser, loginUser, updateUser, getProfile };