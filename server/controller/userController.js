import userModel from "../models/userModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Missing Details' })
        }

        //you increase the value for extra security , but it will take more time.
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name: name,
            email: email,
            password: hashedPassword
        }
        const newUser = new userModel(userData);
        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({
            success: true,
            token,
            user: { name: user.name }
        })

    }
    catch (err) {
        console.log(err);
        res.json({ success: false, message: err })
    }
}

export const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email: email });
        if (!user) {
            res.json({ sucess: false, message: "User doesn't exists." })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.json({
                success: true,
                token,
                user: { name: user.name }
            })
        } else {
            res.json({ success: false, message: "Invalid Credentials" })
        }
    }
    catch (err) {
        console.log(err);
        res.json({ success: false, message: err })
    }

}


export const userCredits = async (req, res) => {
    try {
        const { userId } = req.body;
        //we are getting the userID from the req.body provided by the middleware auth.js

        const user = await userModel.findById(userId);
        res.json({
            success: true,
            credits: user.creditBalance,
            user: { name: user.name }
        });

    }
    catch (err) {
        console.log(err);
        res.json({ success: false, message: err.message })
    }
}


