import mongoose from "mongoose";
import validator from "validator";
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
    },
    location: {
        type: String,
        default: 'India',
    },
}, { timestamps: true }
);
export default mongoose.model("User", userSchema);