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












//IMG
   {/* 
             image: {
            type: String,
            default: 'default.jpeg',
            match: [
              /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i,
              "Please provide a proper URL for the Author's image",
            ],
          },
    */}


// REF FOR PROJECTS

    {/* 

  PROJECTS
    author: {
    type: Schema.Types.ObjectId,
    ref: 'Author',  },


  USERS
      projects: [{type: Schema.Types.ObjectId, ref:"projectModel"}]
      
  */}