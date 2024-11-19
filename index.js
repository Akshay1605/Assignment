const express = require('express');
const mongoose = require('mongoose');
const todosRoutes = require('./routes/todos');

const app = express();
const PORT = 3000;


app.use(express.json());


const mongoURI = 'mongodb+srv://admin:root@cluster0.zkos7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB Atlas!'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));


app.use('/todos', todosRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
