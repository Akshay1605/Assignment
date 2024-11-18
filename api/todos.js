// api/todos.js
const express = require('express');
const mongoose = require('mongoose');
const Todo = require('../models/todo'); // Adjust this path as necessary

const app = express();
app.use(express.json());

// MongoDB connection
const mongoURI = process.env.MONGODB_URI; // Use environment variables in Vercel
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB Atlas!'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Define the POST and GET routes
app.post('/todos', async (req, res) => {
    const { title, description } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    try {
        const todo = new Todo({ title, description });
        const savedTodo = await todo.save();
        res.status(201).json(savedTodo);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create to-do' });
    }
});

app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve to-dos' });
    }
});

// Export the app as a serverless function for Vercel
module.exports = app;
