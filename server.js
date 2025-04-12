const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/users');

const app = express();

app.use(cors()); // 👉 Enable CORS for all origins
app.use(express.json());
app.use('/api/upload', require('./routes/upload'));
app.use('/uploads', express.static('uploads'));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/post', postRoutes);

const PORT = 5004;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
