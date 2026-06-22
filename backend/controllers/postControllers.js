const path=require("path")
const fs=require("fs")
const asyncHandler = require("express-async-handler");
const{Post,validatecreatepost,validateupdatepost}=require("../models/Post")
const{cloudinaryuploadimage, cloudinaryremoveimage}=require("../utils/cloudinary")
const{Comment}=require("../models/Comment")


/**- ---------------------------------
 * @desc    create new post
 * @route  /posts
 * @method  post
 * @access  private (only logged in user)
 -------------------------------------*/
  module.exports.createPostCtrl = asyncHandler(async (req, res) => {
    //1-validation for image
if(!req.file){
    return res.status(400).json({message:"no image provided"})
}
//2-validation for data
const{error}=validatecreatepost(req.body);
    if(error){
     return res.status(400).json({message:error.details[0].message})
    }
    //3-upload photo
   const imagepath=path.join(__dirname,`../images/${req.file.filename}`);
     const result=await cloudinaryuploadimage(imagepath);
    console.log(result)
    //4-create new post and save it in db
    const post=await Post.create({
        title:req.body.title,
      description:req.body.description,
      category:req.body.category,
      user:req.user.id,
      image:{
        url:result.secure_url,
        publicId:result.public_id,
      }

    })
    //5-send response to cient
    res.status(201).json(post);
    //6-remove image from server
    fs.unlinkSync(imagepath)
  })
 

  /**- ---------------------------------
 * @desc    get all post
 * @route  /posts
 * @method  get
 * @access  public
 -------------------------------------*/

   module.exports.getPostCtrl = asyncHandler(async (req, res) => {
    const POST_PER_PAGE=3;
    const{pageNumber,category}=req.query
    let posts;
    if(pageNumber){
      posts=await Post.find()
      .skip((pageNumber-1)*POST_PER_PAGE)
      .limit(POST_PER_PAGE).sort({crearedAt:-1}).populate("user",["-password"])
    }else if(category){
      posts=await Post.find({category}).sort({crearedAt:-1}).populate("user",["-password"])
    }else{
         posts=await Post.find().sort({crearedAt:-1}).populate("user",["-password"])
    }
    res.status(200).json(posts)
   })


   
  /**- ---------------------------------
 * @desc    get single post
 * @route  /posts/:id
 * @method  get
 * @access  public
 -------------------------------------*/

   module.exports.getsinglePostCtrl = asyncHandler(async (req, res) => {
    const post=await Post.findById(req.params.id).populate("user",["-password"]).populate("comments")
    if(!post){
      return res.status(404).json({message:"post not found"})
    }
  res.status(200).json(post)
   })

    /**- ---------------------------------
 * @desc    get posts count
 * @route  /posts/count
 * @method  get
 * @access  public
 -------------------------------------*/

   module.exports.getpostcountCtrl = asyncHandler(async (req, res) => {
    const count=await Post.countDocuments()
  res.status(200).json(count)
   })

     /**- ---------------------------------
 * @desc    delete post
 * @route  /posts/:id
 * @method  delete
 * @access  private(only admin or user himself)
 -------------------------------------*/

   module.exports.deletePostCtrl = asyncHandler(async (req, res) => {
    const post=await Post.findById(req.params.id)
    if(!post){
      return res.status(404).json({message:"post not found"})
    }
    //validation
    if(req.user.isAdmin||req.user.id===post.user.toString()){
      await Post.findByIdAndDelete(req.params.id)
            await cloudinaryremoveimage(post.image.publicId)
            await Comment.deleteMany({postId:post._id})
            res.status(200).json({message:"post has been deleted",postId:post._id})
    }else{
      res.status(403).json({message:"access danied"})
    }
   })

     /**- ---------------------------------
 * @desc    update post
 * @route  /posts/:id
 * @method  put
 * @access  private(only admin or user himself)
 -------------------------------------*/

    module.exports.updatePostCtrl = asyncHandler(async (req, res) => {
      //1-validation
      const{error}=validateupdatepost(req.body)
      if(error){
     return res.status(400).json({message:error.details[0].message})
      }
      //2g-get the post from db and check if post exist
      const post=await Post.findById(req.params.id);
      if(!post){
        return res.status(400).json({message:"post not found"})
      }
      //3-check if this post belong to logged in user
      if(req.user.id !==post.user.toString()){
        return res.status(400).json({message:"access denied,you are not allowed"})
      }
      //4-update post
      const updatepost=await Post.findByIdAndUpdate(req.params.id,{
        $set:{
          title:req.body.title,
          description:req.body.description,
          category:req.body.category
        }
      },{new:true}).populate("user",["-password"])
      //5-send res to client
      res.status(200).json(updatepost)
    })

    
     /**- ---------------------------------
 * @desc    update post image
 * @route  /posts//image/:id
 * @method  put
 * @access  private(only admin or user himself)
 -------------------------------------*/

    module.exports.updatePostimageCtrl = asyncHandler(async (req, res) => {
      //1-validation
      if(!req.file){
     return res.status(400).json({message:"no image provided"})
      }
      //2g-get the post from db and check if post exist
      const post=await Post.findById(req.params.id);
      if(!post){
        return res.status(400).json({message:"post not found"})
      }
      //3-check if this post belong to logged in user
      if(req.user.id !==post.user.toString()){
        return res.status(400).json({message:"access denied,you are not allowed"})
      }
      //4-delete old image post
      await cloudinaryremoveimage(post.image.publicId)
      //5-upload new image
       const imagepath=path.join(__dirname,`../images/${req.file.filename}`);
     const result=await cloudinaryuploadimage(imagepath);
//4-update image in db
      const updatepost=await Post.findByIdAndUpdate(req.params.id,{
        $set:{
         image:{
          url:result.secure_url,
          publicId:result.public_id
         }
        }
      },{new:true})
      //7-send res to client
      res.status(200).json(updatepost)
      //8-remove image from server
      fs.unlinkSync(imagepath)
    })

      /**- ---------------------------------
 * @desc    toggle like
 * @route  /posts/like/:id
 * @method  put
 * @access  private(only user himself)
 -------------------------------------*/

     module.exports.togglelikeCtrl = asyncHandler(async (req, res) => {
const loggedinUser=req.user.id
const{id:postId}=req.params
let post=await Post.findById(postId)
if(!post){
  return res.status(404).json({message:"post not found"})
}
const ispostalreadyliked=post.likes.find(
  (user)=>user.toString()===loggedinUser)
  if(ispostalreadyliked){
    post=await Post.findByIdAndUpdate(postId,{
      $pull:{likes:loggedinUser}
    },{new:true})
  }else{
    post=await Post.findByIdAndUpdate(postId,{
      $push:{likes:loggedinUser}
    },{new:true})
  }
  res.status(200).json(post)

     })
