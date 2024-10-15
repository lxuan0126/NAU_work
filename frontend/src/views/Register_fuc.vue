<template>
  <div class="register-container">
    <div class="register-box">
      <h1 class="title">注册</h1>
      <form @submit.prevent="registerUser" class="register-form">
        <input
          type="text"
          v-model="username"
          placeholder="Username"
          class="input-field"
          required
        />
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          class="input-field"
          required
        />
        <textarea
          v-model="bio"
          placeholder="个人信息简介"
          class="input-field bio-field"
          required
        ></textarea>
        <button type="submit" class="register-btn">注册</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; // 引入 Axios 用于 HTTP 请求
export default {
  data() {
    return {
      username: '',
      password: '',
      bio: ''
    };
  },
  methods: {
    async registerUser() {
      try {
        // 使用 Axios 发送 POST 请求，将注册信息发送到后端
        const response = await axios.post('http://localhost:5000/api/users/register', {
          username: this.username,
          password: this.password,
          bio: this.bio
        });
        console.log('注册成功:', response.data);
        alert('注册成功！');
        this.$router.push('/login');
      } catch (error) {
        console.error('注册失败:', error.response.data);
        alert(`注册失败: ${error.response.data.error || '未知错误'}`);
      }
    }
  }
};
</script>

<style scoped>
/* 页面容器样式 */
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
  font-family: 'Arial', sans-serif;
}

/* 注册框样式 */
.register-box {
  background-color: #ffffff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

/* 标题样式 */
.title {
  font-size: 2rem;
  color: #333;
  margin-bottom: 30px;
}

/* 输入框和文本域样式 */
.input-field {
  width: 100%;
  padding: 15px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
  resize: none; /* 禁用文本域的拖拽功能 */
}

/* 简介输入框样式 */
.bio-field {
  height: 100px; /* 定义简介的高度 */
}

/* 输入框聚焦时的样式 */
.input-field:focus {
  border-color: #4CAF50;
  outline: none;
  box-shadow: 0px 0px 5px rgba(76, 175, 80, 0.5);
}

/* 注册按钮样式 */
.register-btn {
  width: 100%;
  padding: 15px;
  background-color: #4CAF50;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;
}

/* 按钮悬停效果 */
.register-btn:hover {
  background-color: #45a049;
}

/* 调整页面在移动设备上的显示效果 */
@media (max-width: 500px) {
  .register-box {
    padding: 20px;
  }

  .input-field {
    padding: 12px;
  }

  .register-btn {
    padding: 12px;
  }
}
</style>
