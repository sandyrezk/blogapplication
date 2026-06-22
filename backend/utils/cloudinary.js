const cloudinary=require("cloudinary")

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

//cloudinary upload image
const cloudinaryuploadimage=async(filetoupload)=>{
    try{
        const data=await cloudinary.uploader.upload(filetoupload,{
     resource_type:'auto',
        })
return data;
        }catch(error){
return error;
        }
    }

    //cloudinary remove image
const cloudinaryremoveimage=async(imagepublicid)=>{
    try{
        const result=await cloudinary.uploader.destroy(imagepublicid)
return result;
        }catch(error){
return error;
        }
    }

    
    //cloudinary remove multiple image
const cloudinaryremovemultiimage=async(publicid)=>{
    try{
        const result=await cloudinary.v2.api.delete_resources(publicid)
return result;
        }catch(error){
return error;
        }
    }

    module.exports={
        cloudinaryuploadimage,
        cloudinaryremoveimage,
        cloudinaryremovemultiimage,
    }
    
