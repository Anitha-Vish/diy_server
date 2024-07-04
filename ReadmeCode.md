------------ Server.js

import dotenv from 'dotenv';
import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import projectRoutes from './routes/projectRoutes.js';
import connectDB from './db/db-connection.js';
import userRouter from "./routes/userRoute.js";
//import commentRouter from './routes/commentRoutes.js';

dotenv.config();


// PORT & express
const port = process.env.PORT || 8000;
const app = express();


//JSON  & Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Database connection
connectDB();


app.use("/users", userRouter)

//app.use("/comments", commentRouter )

app.use('/api/projects', projectRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to Server');
});




//SERVER
app.listen(port, () => { console.log( `Server is live on http://localhost:${port}`)})

 -------------UserModel.js

import { Schema, model } from "mongoose"
import bcrypt from "bcrypt"

// import mongoose from "mongoose"
// const userSchema = new mongoose.Schema ({ ..})

//Schema MODEL
const userSchema = new Schema ({

  username: { type: String, required: [true, "please provide a username"], unique: true, },

  userImage: { type: String, default: ""},   // added field for cover image

  firstName: { type: String, required: [true, "please provide a Name"], },

  lastName:{type: String, required: [true, "please provide a lastName"], },

  about:{type: String, default: "" },

  email: { type: String, required: true,  unique: true,
      
    validate: { 
          validator: (email) => {
            const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            return emailRegex.test(email);
          },  
          message: "Please Provide a valid email adress"
      }},

  password: { type: String, required: true },

})

// VALIDATION signup
userSchema.statics.signup = async function(username, firstName,lastName, email ,password ) {
  const usernameExists = await this.findOne({username})

  if(usernameExists) throw Error("Username already in use")

  const salt = await bcrypt.genSalt(10)
  const hashedPW = await bcrypt.hash(password, salt)
  const user = await this.create({ username, firstName, lastName, email, password: hashedPW, })

  return user; 
}

// VALIDATION login
userSchema.statics.login = async function(username, password ) {
  if(!username || !password) throw Error("Please provide your credientials")

    //USERNAME
    const user = await this.findOne({username}).lean();
    if(!user) throw Error("Incorrect username");
    
      //EMAIL
      //  const eamil = await this.findOne({email}).lean();
      //  const matchEmail = await compare(email, user.email );
      //  if(!matchEmail) throw Error("Incorrect username");

    //PASSWORD
    const match = await bcrypt.compare(password, user.password );
    if(!match) throw Error("Incorrect password");

    return user; 
}


export default model ( "User" , userSchema )
// export default mongoose.model ( "User" , UserSchema )


----- UserController.js

import User from "../models/userModel.js"
import cloudinary from "../db/cloudinaryConfig.js";
import bcrypt from "bcrypt"





export const getAllUsers =  async (req, res) => {
    try{
        const users = await User.find();
        res.status(200).json(users); 
    }catch(error) {
        res.status(500).json({message: error.message})
    }
};

export const getUser = async ( req, res) => {
    const {id} = req.params; 

    try{
    const user = await User.findById(id);
        if(!user) return res.status(404).json({message: "User not found"})
    res.status(200).json(user)
    }catch(error) {
        res.status(500).json({ message: error.message})
    }
}

export const updateUser = async (req,res) => {
    const {id} = req.params;
    const {username, userImage, firstName, lastName, about, email, password } = req.body   // added userImage

    try {
        // HASH PASSWORD
            if(password) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(password, salt)
            }
        // Upload User Image
        if (req.files && req.files.length > 0) {
            const userImageFile = req.files.find((file) => file.fieldname === "userImage");
            if (userImageFile) {
              const result = await cloudinary.uploader.upload(userImageFile.path);
              req.body.userImage = result.secure_url;
            }
          }

        // UPDATE USER FIELD
        const updateUser = await User.findByIdAndUpdate(
            id, 
            req.body, 
            { new:true, runValidators: true } ) // 'new' returns the updated document, 'runValidators' ensures validation
            
            if (!updateUser) return res.status(404).json({ message: 'User not found' });
            res.status(200).json(updateUser);

    }catch(error) {
        res.status(500).json({ message: error.message})
    }
}

export const deleteUser = async (req, res) => {

    const {id} = req.params;

    try{
        const user = await User.findByIdAndDelete(id)    // const user = await User.findByIdAndDelete(id)
        if(!user) return res.stats(404).json({message: "User not found"})
        res.status(200).json({message: "User deleted successfully!"})
      
    }catch(error) {
        res.status(500).json({message: error.message})
    }
}



{/* 
    const user = await User.findById(id);
        if(!user) return res.status(404).json({message: "User not found"})


          const user = await User.findById(id)    // const user = await User.findByIdAndDelete(id)
        if(!user) return res.stats(404).json({message: "User not found"})
            await user.remove(); 
        res.status(200).json({message: "User deleted successfully!"})
    */}

    -------- LoginController.js

    import User from  "../models/userModel.js"
import createToken from "./createToken.js"


const loginUser = async function ( req,res) {

    const { username, password } = req.body;
    console.log( username, password )

    try{
        const user = await User.login(username, password )
            console.log(user)
            // res.json(user)
        const token = createToken(user._id)
        res.json({token, user});  // option added  : {firstName: user.firstName, lastName: user.lastName, username: user.username}
    } catch (error) {
        if(error.message === "Incorrect username") {
            return res.status(400).json({error: "Incorrect username"});
        } else if (error.message === "Incorrect password" ) {
            return res.status(400).json({error: "Incorrect password"}); 
        } else if (error.message === "Please provide your credientials") {
            return res.status(400).json({error: "Both fields are required"})
        } else{
            return res.status(400).json({ error: error.message}); 
        }
    }

}

export { loginUser}

--------------VerifyUser.js

import jwt from "jsonwebtoken";
import User from  "../models/userModel.js"


const verifyUser = async function (req,res, next) {
  
// Bearer TOKEN
    const {authorization} = req.headers;
    //console.log(authorization)

    if(!authorization) {
        return res.status(401).json({ error: "Not Authorized"})
    }
// Only TOKEN
    const token = authorization.split(' ')[1];
    console.log(token)

    try{
        const payload = jwt.verify(token, process.env.SECRET); 
        console.log(payload)
    
        const user = await User.findById(payload.id)
        next()

    } catch(error) {
        return res.status(401).json({error: "Not Authorized"})
    }
   
   
}

export default verifyUser;

----------------- Routes

import express from "express"
import { signupUser } from "../controllers/signupController.js"
import { loginUser } from "../controllers/loginController.js"
import verifyUser from "../middleware/verifyUsers.js"
import parser from "../db/multerConfig.js";
import { deleteUser, getAllUsers, getUser, updateUser } from "../controllers/userCntroller.js"

const userRouter = express.Router()


userRouter.get("/", getAllUsers)
userRouter.get("/:id", getUser)
userRouter.put("/update/:id", parser.any(),  updateUser)  // added for multer
userRouter.delete("/delete/:id", deleteUser)

userRouter.post("/register", signupUser)
userRouter.post("/login", loginUser )
userRouter.get("/admin", verifyUser, (req,res) => res.send("Hello Royce: route is Protected !"))


export default userRouter; 

