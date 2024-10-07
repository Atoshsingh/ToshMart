import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcript from "bcryptjs"; // for password incription 
import createToken from "../utils/createToken.js";

const createUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        throw new Error("Fill out all input fields");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).send("User already exists"); // Add return to stop execution
    }

    //Incription of password 
    const salt = await bcript.genSalt(10); // salt is basically lenth of that incripted password
    const hashedPassword = await bcript.hash(password, salt)

    const newUser = new User({ username, email, password: hashedPassword });
    try {
        await newUser.save();
        createToken(res, newUser._id);
        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
        });
    } catch (error) {
        res.status(400);
        throw new Error("Invalid user data");
    }
});
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        //checking the password 
        console.log(password , existingUser.password)
        const isPasswordValid = await bcript.compare(password, existingUser.password);
        if (isPasswordValid) {
            createToken(res, existingUser._id);
            res.status(201).json({
                _id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                isAdmin: existingUser.isAdmin,
            })
            return;
        }
    }
    else{
        res.status(400).send("please try to register your self first ")
    }

})

const logoutCurrentUser = asyncHandler(async (req,res)=>{
    // res.cookie("jwt", '', {
    //     httpOnly: true,
    //     expires: new Date(0),
    //     sameSite: 'None' // or 'Lax'/'Strict' based on how it was set
    // });
    // res.status(200).json({message:"Logged out successfuly.. "});
    return res.cookie("jwt","",{maxAge:0}).json({
        message:"Logged out successfully!",
        success:true
    })
})
const getCurrentUserProfile = asyncHandler(async (req,res)=>{
   const user = await User.findById(req.user._id);
   if(user){
    res.json({
        _id:user._id,
        username:user.username,
        email:user.email,
    })
   }
   else{
    res.status(404);
    throw new Error("User Not Found");
   }
})
const updateCurrentUserProfile = asyncHandler(async (req,res)=>{
   const user = await User.findById(req.user._id);
   if(user){
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    
    if(req.body.password){
        const salt = await bcript.genSalt(10); // salt is basically lenth of that incripted password
    const hashedPassword = await bcript.hash(req.body.password, salt)
        user.password = hashedPassword;
    }
    const updatedUser = await user.save();

    res.json({
        _id:updatedUser._id,
        username:updatedUser.username,
        email:updatedUser.email,
        isAdmin:updatedUser.isAdmin,
    });
   }
   else{
    res.status(404);
    throw new Error("User not found");
   }
})
const deleteUserById = asyncHandler(async (req,res)=>{
   const user = await User.findById(req.params.id);
   if(user){
    if(user.isAdmin){
        res.status(400)
        throw new Error("Cannot delete admin user");
    }
    await User.deleteOne({_id:user._id})
    res.json({message:"User removed"});
   }
   else{
    res.status(404);
    throw new Error("User Not found")
   }
})
const  getAllUsers = asyncHandler(async (req,res)=>{
    const users = await User.find({});
    res.json(users);
})
const  getUserById = asyncHandler(async (req,res)=>{
    const user = await User.findById(req.params.id).select(-"password")
    if(user){
        res.json(user);
    }
    else{
        res.status(404);
        throw new Error("User not found");
    }
})

const updateUserById = asyncHandler(async(req,res)=>{
    console.log("getting responce")
    const user = await User.findById(req.params.id);
    if(user){
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin);

        const updateUser = await user.save();
        res.json({
            _id:updateUser._id,
            username:updateUser.username,
            email:updateUser.email,
            isAdmin:updateUser.isAdmin
        })

    }
    else{
        res.status(404);
        throw new Error("User not found!")
    }
})

export {updateUserById,getUserById, deleteUserById, updateCurrentUserProfile , getCurrentUserProfile, createUser, loginUser ,logoutCurrentUser , getAllUsers}

/* 
JWT - basscally a token which holds all information of user (compact self-contained way to transmit data from client to server) or Adhar signature paper box which can be open by server only which hold the all information about that user.   
*/


//last night (10/9/2024) 52:15 / 3:55:10
