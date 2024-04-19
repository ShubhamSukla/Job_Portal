import JWT from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        next("Auth failed");
    }
    //console.log((authHeader));
    const tokenString = String(authHeader);
    const token = tokenString.split(' ')[1];
    // const n = authHeader.length;
    // console.log(n);
    // const token = authHeader.substring(6,n);
    // console.log(t);
    // let token = authHeader.spilt(' ')[1];
    //console.log(token);
    try {
        const payload = JWT.verify(token, process.env.JWT_secret);
        console.log(payload);
        req.user = { userId: payload.UserId }
        next();
    } catch (err) {
        console.log(err);
        next("Auth failed");
    }

}
//console.log(userAuth);
export default userAuth;