import jwt from "jsonwebtoken";

export const userAuth = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({
            success: false,
            message: "User not authorized.Login again"
        })
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET); //decoding the token 

        if (!req.body) {
            req.body = {}; //if not this there is no req.body and it showing undefined
        }

        if (tokenDecode.id) {
            req.body.userId = tokenDecode.id;
            //since we made this with the user id we can get the id back from there and pass it in body 
        } else {
            return res.json({
                success: false,
                message: "User not authorized.Login again"
            })
        }
        next();
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }

}