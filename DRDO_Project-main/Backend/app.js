const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 5000;

// ✅ Use async function to connect to DB and start server
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log('✅ MongoDB connected');

    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error('❌ DB connection failed:', err);
    process.exit(1);
  }
};
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);



startServer();
