import bcrybt from "bcryptjs";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
// Authentication for Register
export const register = async (req, res) => {
  try {
    const { email, phoneNumber, password,fullname,  role } = req.body;
    
    // console.log( email, phoneNumber, password, role ,fullname );
    
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    //additng profile pic to the cloudinary
    const file = req.file;
    const fileUri = getDataUri(file)
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content)
    console.log("CloudResponce => " , cloudResponse);
  

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: "User Already Exists",
        success: false,
      });
    }

    const hashedPassword = await bcrybt.hash(password, 10);

    
    const NewUser = await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile : {
        profilePhoto : cloudResponse.secure_url,
      }
    });

    const token = jwt.sign({ id: NewUser._id }, process.env.JWT_SECRET);

    return res.status(200).json({
      message: "Account Created Successfully",
      token,
      FullName: NewUser.fullname,
      Email: NewUser.email,
      PhoneNumber: NewUser.phoneNumber,
      Role: NewUser.role,
      success: true,
    });
  } catch (err) {
    console.log("Error While registering", err);
    return res.status(500).json({
      error: "Error While Registering",
    });
  }
};

// Authentication for Login
export const Login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something Went Wrong",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        meassage: "Incorrect Email",
        success: false,
      });
    }

    const isMatchedPassword = await bcrybt.compare(password, user.password);
    if (!isMatchedPassword) {
      return res.status(400).json({
        meassage: "Incorrect Password",
        success: false,
      });
    }

    //Check role is Correct or not
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account does not exist with currect role",
        success: false,
      });
    }

    //generating Token
    const payload = {
      userId: user._id,
    };

    //tokens
    const token = await jwt.sign(payload, process.env.JWT_SECRET);

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
    //storing tokens into cookies

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSize: "strict",
      })
      .json({
        message: `Welcome Back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (err) {
    console.log("Error has Been Occued => ", err);
  }
};

//Logout section =>
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", { maxAge: 0 }).json({
      message: "Logged out Successfully",
      success: true,
    });
  } catch (err) {
    console.log("Error Occured =>", err);
  }
};

//Updating the profile
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        
        const file = req.file;
        // cloudinary ayega idhar
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        console.log("Cloudinary =>" , cloudResponse);

        //access the url from the responce
        const fileUrl = cloudResponse.secure_url
        console.log("Uploaded File URL =>", fileUrl);
        
        let skillsArray;
        if(skills){
            skillsArray = skills.split(",");
        }
        const userId = req.id; // middleware authentication
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        }
        // updating data
        if(fullname) user.fullname = fullname
        if(email) user.email = email
        if(phoneNumber)  user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray
      
        // resume comes later here...
        if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url // save the cloudinary url
            user.profile.resumeOriginalName = file.originalname // Save the original file name
        }
        console.log("resume origional name => " , user.profile.resumeOriginalName);
        

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message:"Profile updated successfully.",
            user,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}