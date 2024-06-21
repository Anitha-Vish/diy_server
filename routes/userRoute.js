import express from "express"
import { signupUser } from "../controllers/signupController.js"
import { loginUser } from "../controllers/loginController.js"
import verifyUser from "../middleware/verifyUsers.js"

const userRouter = express.Router()

//userRouter.get("/:id")
userRouter.post("/signup", signupUser)
userRouter.post("/login", loginUser )
userRouter.get("/admin", verifyUser, (req,res) => res.send("Hello Royce: route is Protected !"))


export default userRouter; 
