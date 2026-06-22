const asyncHandler = require("express-async-handler");
const{Comment,validateCreatecomment,validateupdatecomment}=require("../models/Comment")
const{User}=require("../models/User")

/**- ---------------------------------
 * @desc    create comment
 * @route  /comment
 * @method  POST
 * @access  private(only logged in user)
 -------------------------------------*/
  module.exports.createCommentCtrl = asyncHandler(async (req, res) => {
    //1-validation for comment

const{error}=validateCreatecomment(req.body);
    if(error){
     return res.status(400).json({message:error.details[0].message})
    }
    const profile=await User.findById(req.user.id)
    const comment=await Comment.create({
        postId:req.body.postId,
        text:req.body.text,
        user:req.user.id,
        username:profile.username
    })
    res.status(201).json(comment)
})


/**- ---------------------------------
 * @desc    get all comment
 * @route  /comment
 * @method  get
 * @access  private(only logged in user)
 -------------------------------------*/
  module.exports.getallCommentCtrl = asyncHandler(async (req, res) => {
    const comments=await Comment.find().populate("user")
    res.status(200).json(comments)
})

/**- ---------------------------------
 * @desc    delete comment
 * @route  /comment/:id
 * @method  delete
 * @access  private(admin or only logged in user)
 -------------------------------------*/ 
  module.exports.deleteCommentCtrl = asyncHandler(async (req, res) => {
    const comment=await Comment.findById(req.params.id)
    if(!comment){
        return res.status(404).json({message:"comment not found"})
    }
    if(req.user.isAdmin||req.user.id===comment.user.toString()){
      await Comment.findByIdAndDelete(req.params.id)   
      return res.status(200).json({message:"comment has been deleted"})
    }
    else{
     res.status(403).json({message:"access danied"})
 
    }
  })

    /**- ---------------------------------
   * @desc    update comment
   * @route  /comments/:id
   * @method  put
   * @access  private(only admin or user himself)
   -------------------------------------*/
  
      module.exports.updatecommentCtrl = asyncHandler(async (req, res) => {
        //1-validation
        const{error}=validateupdatecomment(req.body)
        if(error){
       return res.status(400).json({message:error.details[0].message})
        }
        //2g-get the comment from db and check if post exist
        const comment=await Comment.findById(req.params.id);
        if(!comment){
          return res.status(400).json({message:"comment not found"})
        }
        //3-check if this comment belong to logged in user
        if(req.user.id !==comment.user.toString()){
          return res.status(400).json({message:"access denied,you are not allowed"})
        }
        //4-update comment
        const updatecomment=await Comment.findByIdAndUpdate(req.params.id,{
          $set:{
        text: req.body.text
          }
        },{new:true}).populate("user",["-password"])
        //5-send res to client
        res.status(200).json(updatecomment)
      })
