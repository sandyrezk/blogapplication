const asyncHandler = require("express-async-handler");
const{Category,validateCreatecategory}=require("../models/Category")


/**- ---------------------------------
 * @desc    create category
 * @route  /category
 * @method  POST
 * @access  private(only admin)
 -------------------------------------*/
  module.exports.createCategoryCtrl = asyncHandler(async (req, res) => {
    //1-validation for comment

const{error}=validateCreatecategory(req.body);
    if(error){
     return res.status(400).json({message:error.details[0].message})
    }
    const category=await Category.create({
        title:req.body.title,
        user:req.user.id,
    })
    res.status(201).json(category)
})

/**- ---------------------------------
 * @desc    get all category
 * @route  /category
 * @method  get
 * @access  public
 -------------------------------------*/
  module.exports.getallCategoryCtrl = asyncHandler(async (req, res) => {
    const category=await Category.find()
    res.status(200).json(category)
})


/**- ---------------------------------
 * @desc    delete category
 * @route  /comment/:id
 * @method  delete
 * @access  private(admin or only logged in user)
 -------------------------------------*/ 
  module.exports.deleteCategoryCtrl = asyncHandler(async (req, res) => {
    const category=await Category.findById(req.params.id)
    if(!category){
        return res.status(404).json({message:"category not found"})
    }
      await Category.findByIdAndDelete(req.params.id)   
      return res.status(200).json({message:"category has been deleted",categoryId:category._id,})
     
  })