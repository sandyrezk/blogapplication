const mongoose = require("mongoose");
const Joi = require("joi");
const jwt=require("jsonwebtoken")

// User Schema
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 5,
      maxlength: 100,
    },

    password: {
      type: String,
      required: true,
      trim: true, // بيشيل المسافات من الأول والآخر
      minlength: 8,
    },

    photoprofile: {
      type: Object,
      default: {
        url: "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=2048x2048&w=is&k=20&c=6hQNACQQjktni8CxSS_QSPqJv2tycskYmpFGzxv3FNs=",
        publicId: null,
      },
    },

    bio: {
      type: String,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    isAccountVerified: {
      type: Boolean,
      default: false,
    },
    
  },
  {
    timestamps: true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
  }
  
);
//populate posts that belongs to this user when he/she get his/her profile
UserSchema.virtual("posts",{
  ref:"Post",
  foreignField:"user",
  localField:"_id",
})

//generate auth token
UserSchema.methods.generateAuthToken=function(){
  return jwt.sign({id:this._id,isAdmin:this.isAdmin},process.env.JWT_SECRET)
}


// User model
const User = mongoose.model("User", UserSchema);

/**
 * Validate Register User
 */
function validateRegisterUser(obj) {
  const schema = Joi.object({
    username: Joi.string().trim().min(2).max(100).required(),
    email: Joi.string().trim().min(5).max(100).required().email(),
    password: Joi.string().trim().min(8).required(),
  });

  return schema.validate(obj);
}

/**
 * Validate login User
 */
function validateLoginUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().min(5).max(100).required().email(),
    password: Joi.string().trim().min(8).required(),
  });

  return schema.validate(obj);
}


/**
 * Validate update User
 */
function validateUpdateUser(obj) {
  const schema = Joi.object({
        username: Joi.string().trim().min(2).max(100),
    password: Joi.string().trim().min(8),
    bio:Joi.string(),
  });

  return schema.validate(obj);
}


module.exports = {
  User,
  validateRegisterUser,
  validateLoginUser,
  validateUpdateUser,
};