const asyncHandler = require("express-async-handler");
const {User, validateUpdateUser}=require("../models/User")
const bcrypt=require("bcryptjs")
const path=require("path")
const fs=require("fs")
const{cloudinaryuploadimage,cloudinaryremoveimage,cloudinaryremovemultiimage}=require("../utils/cloudinary")
const{Comment}=require("../models/Comment")
const{Post}=require("../models/Post")


/**- ---------------------------------
 * @desc    Get all user profile
 * @route  /profile
 * @method  GET
 * @access  private (only admin)
 -------------------------------------*/

 module.exports.getAllUsersCtrl = asyncHandler(async (req, res) => {
 const users=await User.find().select("-password").populate("posts");
 res.status(200).json(users);

 })
 

 /**- ---------------------------------
 * @desc    Get user profile
 * @route  /profile/:id
 * @method  GET
 * @access  public
 -------------------------------------*/

 module.exports.getUsersCtrl = asyncHandler(async (req, res) => {
 const user=await User.findById(req.params.id).select("-password");
 if(!user){
    return res.status(404).json({message:"user not found"})
 }
 res.status(200).json(user);

 })

 /**- ---------------------------------
 * @desc    Update user profile
 * @route  /profile/:id
 * @method  put
 * @access  private(only user himself)
 -------------------------------------*/

 module.exports.updateUsersCtrl = asyncHandler(async (req, res) => {
 const {error}=validateUpdateUser(req.body)
 if(error){
    return res.status(404).json({message:error.details[0].message})
 }
 if(req.body.password){
 const salt = await bcrypt.genSalt(10);
     req.body.password = await bcrypt.hash(req.body.password, salt);
 }
const updatedUser=await User.findByIdAndUpdate(req.params.id,{
    $set:{
        username:req.body.username,
        password:req.body.password,
        bio:req.body.bio
    }
},{ new: true}).select("-password")
 res.status(200).json(updatedUser);

 })


  /**- ---------------------------------
 * @desc    Get users count
 * @route  /count
 * @method  GET
 * @access  private(only admin)
 -------------------------------------*/

 module.exports.getUserscountCtrl = asyncHandler(async (req, res) => {
 const count=await User.count();
 res.status(200).json(count);

 })


  /**- ---------------------------------
 * @desc    profile photo upload
 * @route  /photo
 * @method  post
 * @access  private(only logged in user)
 -------------------------------------*/
  module.exports.uploadPhoto= asyncHandler(async (req, res) => {
    //1-validation
    if(!req.file){
         res.status(400).json({message:"no file provided "});
    }
    //2-get the path to the image
    const imagepath=path.join(__dirname,`../images/${req.file.filename}`);

    //3-upload to cloudinary
    const result=await cloudinaryuploadimage(imagepath);
    console.log(result)

    //4-get the user from db
    const user=await User.findById(req.user.id)

    //5-delete the old profile photo if exist
    if(user.photoprofile.publicId!==null){
        await cloudinaryremoveimage(user.photoprofile.publicId);
    }

    //6-change the profile photo field in the db
    user.photoprofile={
        url:result.secure_url,
        publicId:result.public_id
    }
    await user.save();

    //7-send response to client
 res.status(200).json({message:"your profile photo uploaded ",
    photoprofile:{url:result.secure_url, publicId:result.public_id}
 });

 //8-remove image from server
 fs.unlinkSync(imagepath)


 })

   /**- ---------------------------------
 * @desc    delete user profile
 * @route  /delete
 * @method  post
 * @access  private(only admin or user himself)
 -------------------------------------*/

   module.exports.deleteUserProfile= asyncHandler(async (req, res) => {
//1-get the user from db
const user=await User.findById(req.params.id);
if(!user){
     res.status(404).json({message:"user not found "});
}
//2-get all posts from db
const posts=await Post.find({user:user._id})

//3-get the public ids from the posts
const publicids=posts?.map((post)=>post.image.publicId)

//4-delete all posts image from cloudinary
if(publicids?.length>0){
    await cloudinaryremovemultiimage(publicids)
}
//5-delete the profile pic from cloudinary
await cloudinaryremoveimage(user.photoprofile.publicId);
//6-delete user posts and comments
await Post.deleteMany({user:user._id})
await Comment.deleteMany({user:user._id})

//7-delete the user himself
await User.findByIdAndDelete(req.params.id)
//8-send a response to client
res.status(200).json({message:"your profile has been deleted"})
   })


