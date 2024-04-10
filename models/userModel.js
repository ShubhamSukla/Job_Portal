import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
//schema

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is Require"],
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Email is Require"],
        unique: true,
        validate: validator.isEmail,
    },
    password: {
        type: String,
        required: [true, "Password is Require"],
        minlength: [6, "password length should be greater than 6 characters"],
        select:true
    },
    location: {
        type: String,
        default: 'India',
    },
}, { timestamps: true }
);
//middleware
userSchema.pre('save',async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
   //this.password = await bcrypt.hash(this.password,10);
})
//JSon web token

userSchema.methods.checkPassword = async function(userPassword){
    const isMatch = await bcrypt.compare(userPassword,this.password);
    return isMatch;
};

userSchema.methods.createJWT = function(){
    return JWT.sign({UserId:this._id},process.env.JWT_secret,{expiresIn:'1d'});
};

export default mongoose.model("User", userSchema);