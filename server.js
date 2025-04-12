const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/users');
// const reviewPostRoutes = require('./routes/reviewPostRoutes');

const app = express();

app.use(cors()); // 👉 Enable CORS for all origins
app.use(express.json());
app.use('/api/upload', require('./routes/upload'));
app.use('/uploads', express.static('uploads'));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/post', postRoutes);
// app.use('/api/reviews', reviewPostRoutes);

app.get('/', (req, res)=>{
    res.status(200).json({
        message: "node js api success connect"
    })
})
const PORT = 5004;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
