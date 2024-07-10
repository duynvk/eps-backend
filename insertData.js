const mongoose = require('mongoose');
const Role = require('./models/roleModel');
const User = require('./models/userModel');
const Member = require('./models/memberModel');


const uri = 'mongodb+srv://duynvkngv:0wF2C05lfoLv2z4T@eps.yejptbv.mongodb.net/?retryWrites=true&w=majority&appName=eps';

// Tạo người dùng mẫu
const users = [
  {
    username: 'admin',
    email: 'admin@eps.com',
    password: 'password123',
    roles: '668671175593d2b9b0eae2cd',  // Thay bằng ObjectId của Role thực tế
    team_id: '667a8288df5be3d8bef0cd43', // Thay bằng ObjectId của Team thực tế
    group_id: '667a7df0620948e4b9c62e14', // Thay bằng ObjectId của Group thực tế
  },
  {
    username: 'khanh',
    email: 'khanh@eps.com',
    password: 'password123',
    roles: '668671175593d2b9b0eae2cc',  // Thay bằng ObjectId của Role thực tế
    team_id: '667a8288df5be3d8bef0cd44', // Thay bằng ObjectId của Team thực tế
    group_id: '667a7df0620948e4b9c62e14', // Thay bằng ObjectId của Group thực tế
  }
];

// Tạo thành viên mẫu
const members = [
  {
    name: 'John Doe',
    team_id: '60d0fe4f5311236168a109cb', // Thay bằng ObjectId của Team thực tế
    group_id: '60d0fe4f5311236168a109cc', // Thay bằng ObjectId của Group thực tế
    total_score: 50
  },
  {
    name: 'Jane Doe',
    team_id: '60d0fe4f5311236168a109ce', // Thay bằng ObjectId của Team thực tế
    group_id: '60d0fe4f5311236168a109cf', // Thay bằng ObjectId của Group thực tế
    total_score: 75
  }
];

mongoose.connect(uri)
  .then(async () => {
    console.log('Connected to MongoDB Atlas');

    await Member.insertMany(members);

    console.log('Data inserted successfully');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });
