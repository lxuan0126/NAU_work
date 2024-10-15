const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

// Middlewares
app.use(cors()); // 允许跨域请求
app.use(bodyParser.json()); // 解析 JSON 请求体

const USERS_DB = './users.json'; // 使用 JSON 文件作为数据库

// Helper functions to read and write the "database"
function getUsers() {
  return JSON.parse(fs.readFileSync(USERS_DB, 'utf-8'));
}




// User routes

// 注册
app.post('/api/users/register', async (req, res) => {
  const { username, password, bio } = req.body;
  const users = getUsers();
  if (users.find((user) => user.username === username)) {
    return res.status(400).json({ error: '用户已存在' });
  }
  const newUser = { username, password, bio};
  users.push(newUser);
  // 保存更新后的用户列表
  fs.writeFileSync(USERS_DB, JSON.stringify(users, null, 2), 'utf-8');
  res.status(201).json({ message: '注册成功，请前往登录界面' });
});

// 登录
app.post('/api/users/login', async (req, res) => {
  const { username, password } = req.body;
  const users = getUsers();
  console.log('用户数据:', users);
  const user = users.find((u) => u.username === username);
  if (!user) {
    console.log(1111);
    return res.status(404).json({ error: '用户未找到，请注册后再登录' });
  }
  if (user.password !== password) {
    console.log(222);
    return res.status(400).json({ error: '密码错误' });
  }
  res.status(200).json({
    message: '登录成功',
    user: {
      username: user.username,
      bio: user.bio
    }
  });
});

// 获取用户信息
app.get('/api/users', (req, res) => {
  const users = getUsers();
  res.status(200).json(users);
});


// 更新用户信息
app.post('/api/users/update', (req, res) => {
  const { username, password, bio } = req.body;
  const users = getUsers(); // 获取所有用户
  // 查找用户
  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(404).json({ error: '用户未找到' });
  }

  // 更新用户信息
  user.password = password; // 更新密码
  user.bio = bio;           // 更新 bio
 
  const userIndex = users.findIndex((u) => u.username === user);
  users[userIndex] = user;
  // 保存更新后的用户列表
  fs.writeFileSync(USERS_DB, JSON.stringify(users, null, 2), 'utf-8');
  res.status(200).json({ message: '用户信息已更新', user });
});

// 删除用户账户
app.post('/api/users/delete', (req, res) => {
  const { username } = req.body;
  const users = getUsers(); // 获取所有用户

  // 查找用户索引
  const userIndex = users.findIndex((u) => u.username === username);

  // 如果找到用户，删除该用户
  if (userIndex !== -1) {
    users.splice(userIndex, 1); // 删除用户
    fs.writeFileSync(USERS_DB, JSON.stringify(users, null, 2), 'utf-8'); // 保存更新后的用户列表
    console.log(`用户 ${username} 已删除`);
    res.status(200).json({ message: '用户已删除' });
  } else {
    console.log(`用户 ${username} 未找到`);
    res.status(200).json({ message: '用户未找到' });
  }
});

// 启动服务器
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
