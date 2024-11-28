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

router.get('/count', async (req, res) => {
    try {
        const taskCount = await TasksModel.countDocuments();
        const pages = Math.ceil(taskCount / 5);
        console.log(pages);
        res.status(200).json({ pages });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
});

router.get('/page/:pageNumber', async (req, res) => {
    try {
        const pageNumber = parseInt(req.params.pageNumber);
        const pageSize = 5;
        const skip = (pageNumber - 1) * pageSize;

        const tasks = await TasksModel.find()
            .skip(skip)
            .limit(pageSize);

        res.status(200).json(tasks);
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