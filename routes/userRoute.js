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
