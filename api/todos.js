const mongoose = require('mongoose');
const Todo = require('../models/todo');

const mongoURI = process.env.MONGODB_URI;

let isConnected = false; // Track connection state

const connectToDatabase = async () => {
  if (!isConnected) {
    await mongoose.connect(mongoURI);
    isConnected = true;
    console.log('Connected to MongoDB Atlas!');
  }
};

module.exports = async (req, res) => {
  await connectToDatabase(); // Ensure connection is established

  const { method } = req;

  if (method === 'GET') {
    try {
      const todos = await Todo.find();
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve to-dos' });
    }
    return; // End the function after responding
  }

  if (method === 'POST') {
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
    return;
  }

  if (method === 'PUT') {
    const { id } = req.query;
    const { title, description, completed } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    try {
      const todo = await Todo.findByIdAndUpdate(
        id,
        { title, description, completed },
        { new: true }
      );
      if (!todo) {
        return res.status(404).json({ error: 'To-do not found' });
      }
      res.status(200).json(todo);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update to-do' });
    }
    return;
  }

  if (method === 'DELETE') {
    const { id } = req.query;

    try {
      const todo = await Todo.findByIdAndDelete(id);
      if (!todo) {
        return res.status(404).json({ error: 'To-do not found' });
      }
      res.status(200).json({ message: 'To-do item deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete to-do' });
    }
    return;
  }

  res.status(404).json({ error: 'Route not found' });
};
