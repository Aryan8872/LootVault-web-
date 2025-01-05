const  mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const { user } = require("../../models/UserModel")

const findAll = async(req,res)=>{
    const users = await user.find();
    res.status(200).json(users);
    
}

const createUser = async(req,res)=>{
    try{
        const salt = await bcrypt.genSalt()
        userData = req.body
        userData.password =await bcrypt.hash( userData.password,salt)
        const newuser = new user(userData) ;
        await newuser.save()
        res.status(201).json({message:newuser,salt:salt});
    }
    catch(e){
        console.log(e)
    }
}

const findByid = async(req,res)=>{
    try{
        const userbyId = await user.findById(req.params.id)
        res.status(200).json(userbyId)
    }
    catch(e){
        console.log(e)

    }
}

const deleteByid = async (req,res)=>{
    try{
        const deluserbyId = await user.findByIdAndDelete(req.params.id)
        res.status(200).json(deluserbyId)

    }
    catch(e){
        console.log(e)
    }
}

const updateUserbyid = async (req,res)=>{
    console.log(req.body);

    try{
        const updateuserbyid = await user.findByIdAndUpdate(req.params.id,req.body,{ new: true, runValidators: true})
        res.status(201).json(updateuserbyid)
    }
    catch(e){
        console.log(e)
    }
}

module.exports= {
    findAll,
    createUser,
    findByid,
    deleteByid,
    updateUserbyid
}