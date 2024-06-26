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
        res.status(400).json({ error: error.message})
    }

}

export { loginUser}