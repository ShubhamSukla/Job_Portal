//error middleware || NEXT function
const errorMiddleware = (err, req, res, next) => {
    // console.log(err)
     const defaultError = {
         code :500,
         message: err,
     }
     if(err.name === "ValidationError"){
        const message = Object.values(err.errors).map((item) => item.message).join(',');
        defaultError.message = message;
        defaultError.code = 400;
     }
     //console.log(err.code);
     //console.log(err.name);
     if(err.code && err.code == 11000){
         defaultError.code = 400;
         defaultError.message =`${Object.keys(err.keyValue)} needs to be unique`;
     }
 
     res.status(defaultError.code).json({message:defaultError.message});
 };
 export default errorMiddleware;