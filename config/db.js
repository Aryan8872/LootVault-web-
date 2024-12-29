const mongoose = require("mongoose")



const  connectDB = async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/LootVault")
        console.log("connected to database")
    }catch(e){
        console.log(e)

    }
}

module.exports=connectDB;