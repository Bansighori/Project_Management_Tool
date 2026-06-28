const express=require("express");

const router=express.Router();

const auth=require("../middleware/auth");

const {

addMember,

getMembers

}=require("../controllers/memberController");

router.post("/",auth,addMember);

router.get("/:projectId",auth,getMembers);

module.exports=router;