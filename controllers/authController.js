import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs';

export const registerController = async (req, res, next) => {

    const { name, email, password } = req.body
    // validate
    if (!name) {
        next("name is required");
    }

    if (!email) {
        next("email is required");
    }
    if (!password) {
        next("password is required and greater than 6 character");
    }
    const exisitingUser = await userModel.findOne({ email })
    if (exisitingUser) {
        next('Email Already Register please login')

    }
    const user = await userModel.create({ name, email, password });

    const token = user.createJWT();

    res.status(201).send({
        success: true,
        message: 'User created successfully',
        user: {
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            location: user.location
        },
        token,
    });

};

export const loginController = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        next("Please Provide all fields ");
    }

    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
        next("Username or Password Invalid");
    }
    console.log(user);
    const isMatch = await bcrypt.compare(password, user.password);
    //console.log(isMatch);
    // const isMatch = await user.checkPassword(password);//comparePassword
    if (!isMatch) {
        //console.log(isMatch);
        next("Username or Password Invalid");
    } else {

        const token = user.createJWT();

        // delete user.password;

        user.password = undefined;

        res.status(201).json({
            success: true,
            message: 'User logged successfully',
            user,
            token
        });
    }
};