require('dotenv').config({ path: './config/.env' });
const express = require('express');
const userRoutes = require('./routes/userRoute');
const groupRoutes = require('./routes/groupRoute');
const teamRoutes = require('./routes/teamRoute');
const memberRoutes = require('./routes/memberRoute');
const scoreRoutes = require('./routes/scoreRoute');
const dbConnect = require("./config/dbConnect");
const cors = require("cors");

// set up server
const app = express();

const corsOptions = {
  origin: ['http://localhost:3000', 'http://14.225.255.42:3000'],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Routes
app.use(userRoutes);
app.use(groupRoutes);
app.use(teamRoutes);
app.use(memberRoutes);
app.use(scoreRoutes);


const PORT = process.env.PORT || 5000;

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Gọi hàm kết nối MongoDB
dbConnect();



