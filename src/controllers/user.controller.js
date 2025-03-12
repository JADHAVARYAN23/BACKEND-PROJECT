import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation - non empty
    // check if user already exists:username,emaail
    // check for Images check for avatar
    // upload them to cloudnary,avatar
    // create user object - create entry in db
    // remove pswd,refreshtoken from response
    // check for usercreation
    // return res


    const {fullname,email,username,password}=req.body
    console.log("email",email);

    // if (fullname==="") {
    //     throw new ApiError(400,"fullname is requires")
    // }

    if(
        [fullname,email,username,password].some((field)=>
            field?.trim()==="")) {
                throw new ApiError(400,"all fields are required")
    }
   const existeduser= User.findOne({
        $or:[{username},{email}]
    })

    if (existeduser) {
        throw new ApiError(409,"already exist")
    }

    const avatarLocalPath=req.files?.avatar[0]?.path;
    const coverImageLocalPath=req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400,"avatar file is required")
    }

    const avatar=await uploadOnCloudinary(avatarLocalPath);
    const coverImage= await uploadOnCloudinary(coverImageLocalPath);

    if (!avatar) {
        throw new ApiError(400,"avatar file is required")
    }

    const user=await User.create({
        fullname,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()
    })
    const createdUser=await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
        throw new ApiError(500,"something went wrong while reg")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered ")
    )


});

export { registerUser };  // ✅ Named Export
