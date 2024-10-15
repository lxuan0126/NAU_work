/* eslint-disable */
<template>
  <div class="login-container">
    <div class="login-box">
      <h1>登录</h1>
      <form @submit.prevent="loginUser" class="login-form">
        <input
          type="text" 
          v-model="username" 
          placeholder="UserName"
          class="input-field"
          required
        />
        <input
          type="password"
          v-model="password"
          placeholder="PassWord"
          class="input-field"
          required
        />
        <button type="submit" class="login-btn">登录</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async loginUser() {
      try {
        // 使用 Axios 发送 POST 请求到后端进行用户验证
        const response = await axios.post('http://localhost:5000/api/users/login', {
          username: this.username,
          password: this.password
        });
        if (response.status === 200) {
          console.log('登录成功:', response.data.user); // 打印返回的用户信息
          this.$router.push({ path: '/data', 
            query: {
              username: this.username,
              password: this.password, 
              bio: response.data.user.bio } });
        } else {
          // 如果不是成功状态，显示错误信息
          alert(`登录失败: ${response.data.message}`);
        }
      } catch (error) {
        if (error.response) {
          // 处理后端返回的错误响应，比如 404 或 400 错误
          console.error('登录请求失败:', error.response.data);
          alert(`登录失败: ${error.response.data.error || '未知错误'}`);
        } else {
          // 处理网络错误或请求未发送成功的情况
          console.error('登录请求失败:', error);
          alert('登录失败，请稍后再试');}
      }
    }
  }
};
</script>

<style scoped>
/* 登录页面的容器居中显示 */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh; /* 占满整个视口的高度 */
  background-color: #f5f5f5;
  font-family: 'Arial', sans-serif;
}

/* 登录框样式 */
.login-box {
  background-color: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 400px;
}

/* 标题样式 */
h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
}

/* 输入框样式 */
.input-field {
  width: 100%;
  padding: 15px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

/* 输入框获取焦点时的样式 */
.input-field:focus {
  border-color: #4CAF50;
  outline: none;
}

/* 登录按钮样式 */
.login-btn {
  width: 100%;
  padding: 15px;
  background-color: #4CAF50;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

/* 按钮悬停样式 */
.login-btn:hover {
  background-color: #45a049;
}

/* 调整页面在小屏设备上的显示效果 */
@media (max-width: 500px) {
  .login-box {
    padding: 20px;
  }

  .input-field {
    padding: 12px;
  }

  .login-btn {
    padding: 12px;
  }
}
</style>
