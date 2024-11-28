import express from "express";
import AuthModel from "../models/authModel.js";
const router = express.Router();

router.post("/signin", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await AuthModel.findOne({ username });
        if(user && user.password === password){
            res.status(200).json(user);
            return res;
        }
        res.status(400).json({message:"Invalid Credentials"});
    } catch (error) {
        console.log('authError', error);
    }
});

export default router;