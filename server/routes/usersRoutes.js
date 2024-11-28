import express from 'express';
import UserModel from "../models/userModel.js";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const data = await UserModel.find();
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
});
router.post('/', async (req, res) => {
    const { name, email } = req.body;
    try {
        const data = await UserModel.create({ name, email });
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
});
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        await UserModel.findByIdAndUpdate(id, { name, email }, { new: true });
        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
});
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await UserModel.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
});

export default router;