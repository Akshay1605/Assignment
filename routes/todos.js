const express = require('express');
const Todo = require('../models/todo');
const router = express.Router();



router.post('/', async (req, res) => {
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


router.get('/', async (req, res) => {
    try {
      const todos = await Todo.find();
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve to-dos' });
    }
  });


router.get('/:id', async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id);
      if (!todo) {
        return res.status(404).json({ error: 'To-do not found' });
      }
      res.status(200).json(todo);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve to-do' });
    }
  });


router.put('/:id', async (req, res) => {
    const { title, description, completed } = req.body;
  
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
  
    try {
      const todo = await Todo.findByIdAndUpdate(
        req.params.id,
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
  });
  

router.delete('/:id', async (req, res) => {
    try {
      const todo = await Todo.findByIdAndDelete(req.params.id);
      if (!todo) {
        return res.status(404).json({ error: 'To-do not found' });
      }
      res.status(200).json({ message: 'To-do item deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete to-do' });
    }
  });

module.exports = router;
