import express from 'express';
import TasksModel from "../models/taskModel.js";


const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const data = await TasksModel.find();
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
});
router.post('/', async (req, res) => {
    const { title, description, dueDate, status, priority, assignedTo } = req.body;
    try {
        const data = await TasksModel.create({ title, description, dueDate, status, priority, assignedTo });
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
});
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, dueDate, status, priority, assignedTo } = req.body;
    try {
        await TasksModel.findByIdAndUpdate(id, { title, description, dueDate, status, priority, assignedTo }, { new: true });
        res.status(200).json({ message: "Task updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
});
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await TasksModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        consoleole.log(error);
        res.status(404).json({ message: error.message });
    }
});

export default router;