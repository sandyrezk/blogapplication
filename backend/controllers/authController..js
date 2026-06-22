const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User, validateRegisterUser,validateLoginUser} = require("../models/User");

/**- ---------------------------------
 * @desc    Register New User
 * @route  /register
 * @method  POST
 * @access  public
 -------------------------------------*/
module.exports.registerUserCtrl = asyncHandler(async (req, res) => {

    // Validate user input
    const { error } = validateRegisterUser(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message });
    }

    // Check if user already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({
            message: "user already exist"
        });
    }

    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create new user
    user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
    });

    // Save user to database
    await user.save();

    // Send success response
    res.status(201).json({
        message: "your register successfully, please log in"
    });
});

/**- ---------------------------------
 * @desc    Login User
 * @route  /login
 * @method  POST
 * @access  public
 -------------------------------------*/

 module.exports.loginUserCtrl = asyncHandler(async (req, res) => {

    // Validate user input
    const { error } = validateLoginUser(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }

    //is user exist
    const user=await User.findOne({email:req.body.email});
    if(!user){
        return res.status(400).json({message:"invalid email or password"})
    }

    //check the password
const isPasswordMatch=await bcrypt.compare(req.body.password,user.password)
 if(!isPasswordMatch){
        return res.status(400).json({message:"invalid email or password"})
    }
    
    //generate token (jwt)
    const token=user.generateAuthToken();

    //response to client
     res.status(200).json({
        _id:user._id,
        isAdmin:user.isAdmin,
        photoprofile:user.photoprofile,
        token,
        username:user.username
     })



});

