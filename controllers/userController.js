import userModel from "../models/userModel.js";

export const updateUserController = async (req, res, next) => {
    const { name, email, lastName, location, user_id } = req.body;
    //console.log(req.body);
    if (!name || !email || !lastName || !location) {
        next("Please Provide All Fields");
    }
    console.log(req.user);
    const user = await userModel.findOne({ _id: req.user.userId });
    //await userModel.findByIdAndDelete(user._id);
    //console.log(user);
    user.name = name;
    user.lastName = lastName;
    user.email = email;
    user.location = location;
    //const password = user.password;
    //console.log(user);
    // console.log(user.name);
    try {
        const updateduser = await userModel.updateOne({ _id: user._id }, { $set: { name: user.name, lastName: user.lastName, email: user.email, location: user.location } });
        console.log(updateduser);
    } catch (err) {
        console.log(err);
    }
    //await user.save();
    const token = user.createJWT();
    res.status(200).json({
        user,
        token,
    });
};

export const getUserController = async(req,res,next)=>{
  try{
   const user = await userModel.findById({_id:req.body.user.userId});
   user.password = undefined;
   if(!user){
    return res.status(200).send({
        message:"user not Found",
        success:false,
    });
   }else{
    res.status(200).send({
        success:true,
        data:user,
    });
   }
  }catch(error){
    console.log(error);
    res.status(500).send({
        message:"auth error",
        success:false,
        error:error.message,
    })
  }  
};