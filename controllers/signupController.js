import User from  "../models/userModel.js"
import createToken from "./createToken.js"


const signupUser = async function (req,res) {
    
    const { username, firstName, lastName, email, password } = req.body;
    // console.log( username, firstName, lastName, password, email )

    try{
        const user = await User.signup(username, firstName, lastName, email, password )
            // console.log(user)
            // res.json(user)

        const token = createToken(user._id)
        res.json({token}); 

    } catch (error) {
        res.status(400).json({ error: error.message})
    }
}


export { signupUser}