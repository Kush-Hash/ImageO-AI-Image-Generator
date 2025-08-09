import axios from "axios";
import userModel from "../models/userModel.js";
import FormData from "form-data";

export const generateImage = async (req, res) => {
    try {
        const { userId, prompt } = req.body;

        if (!prompt) {
            return res.json({ success: false, message: "Prompt is required" });
        }
        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        if (user.creditBalance === 0 || user.creditBalance < 0) {
            return res.json({
                success: false,
                message: "Don't have any credit Balance",
                creditBalance: user.creditBalance
            })
        }

        const formData = new FormData();
        formData.append('prompt', prompt);

        const { data } = await axios.post(
            'https://clipdrop-api.co/text-to-image/v1',
            formData,
            {
                headers: {
                    'x-api-key': process.env.CLIPDROP_API,
                    ...formData.getHeaders()
                },
                responseType: 'arraybuffer'
            }
        );

        const base64Image = Buffer.from(data, 'binary').toString('base64');

        const resultImage = `data:image/png;base64,${base64Image}`

        //deducting user credit 
        await userModel.findByIdAndUpdate(userId, { $inc: { creditBalance: -1 } });

        res.json({
            success: true,
            message: "Image Generated",
            creditBalance: user.creditBalance - 1,
            resultImage
        })

    } catch (err) {
        console.log(err);
        res.json({ success: false, message: err.message })
    }
}