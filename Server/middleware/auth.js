const { verifyToken } = require("../utils/jwt");

const auth = (req, res, next) =>{
    try {
        const userToken = req.headers["authorization"];
        console.log({userToken});
        if(!userToken) return res.status(401).send("UnAuthorized");
        const token = userToken.split(" ")[1];
        console.log({token});
        const payload = verifyToken(token);
        if(!payload) return res.status(401).send("UnAuthorized");
        console.log(userToken);
        req.user = payload; // pass the payload to the functions
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).send("UnAuthorized");
    }
}

const authorize = (roles) =>{
    return (req, res, next) =>{
        const user = req.user;
        if (roles.includes(user.role)) next();
        else res.status(401).send("Not an admin");
    }

}

module.exports = { auth, authorize };