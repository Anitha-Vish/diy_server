import User from "../models/userModel.js"
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
    const {username,  firstName, lastName, email, password } = req.body

    try {
        // HASH PASSWORD
            if(password) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(password, salt)
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