const express=require("express");

const router=express.Router();

const auth=require("../middleware/auth");

const {

createComment,

getComments

}=require("../controllers/commentController");

router.post("/",auth,createComment);

router.get("/:taskId",auth,getComments);

module.exports=router;