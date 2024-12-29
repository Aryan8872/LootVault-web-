const express  = require("express")
const  {findAll,createUser, findByid, deleteByid, updateUserbyid}  = require("../config/controller/CustomerController")

const router = express.Router()


router.get("/",findAll)
router.post("/",createUser)
router.get(`/:id`,findByid)
router.delete(`/:id`,deleteByid)
router.patch(`/:id`,updateUserbyid)

module.exports=router;