const cloudinary = require("cloudinary");
require('dotenv').config()
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME ,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET ,
})

const uploadToCloudinary =async (path , folder ) =>{
    return cloudinary.v2.uploader.upload(path , {
        folder,
        resource_type:"auto"
    }).then((data)=>{
        return {url: data.url , public_id: data.public_id }
    }).catch((err)=>{
        console.log(err);
    })
}

const removeFromCloudinary = async(public_id)=>{
    await cloudinary.v2.uploader.destroy(public_id , (err , result) =>{
        console.log(result , err);
    })
}

module.exports = {uploadToCloudinary , removeFromCloudinary}