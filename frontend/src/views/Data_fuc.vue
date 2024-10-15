/* eslint-disable */
<template>
  <div class="user-container">
    <h1>欢迎用户, {{ username }}</h1>

    <div class="info-container">
      <div class="user-info-box">
        <label for="password">密码</label>
        <input
          v-model="password"
          type="text"
          id="password"
          placeholder="请输入密码"
          class="input-field"
        />
        <label for="bio">个人简介</label>
        <input
          v-model="bio"
          type="text"
          id="bio"
          placeholder="请输入个人简介"
          class="input-field2"
        />
      </div>
    </div>

    <div class="action-buttons">
      <button @click="saveChanges" class="save-btn">保存修改</button>
      <button @click="deleteAccount" class="delete-btn">注销账户</button>
    </div>
  </div>
</template>

<script>
import axios from "axios"; // 引入 Axios
export default {
  data() {
    return {
      bio: this.$route.query.bio || "", // 让 bio 成为可编辑的状态
      username: this.$route.query.username || "", // 获取用户名
      password: this.$route.query.password || "", // 用于保存用户输入的密码
    };
  },
  methods: {
    // 保存修改信息
    async saveChanges() {
      try {
        // 发送 PUT 请求到后端保存修改信息
        const response = await axios.post("http://localhost:5000/api/users/update", {
          username: this.username,
          password: this.password, // 传递密码
          bio: this.bio, // 传递个人简介
        });
        console.log("修改后的个人信息已保存:", response.data);
        alert("个人信息已保存！");
      } catch (error) {
        console.error("保存信息时发生错误:", error);
        alert(`${error}`);
      }
    },
    // 注销并删除账户
    async deleteAccount() {
      try {
        if (confirm("确定要注销账户吗？此操作不可撤销")) {
          // 发送 DELETE 请求到后端删除用户
          const response = await axios.post("http://localhost:5000/api/users/delete",{
              username: this.username,
            });
          console.log("用户账户已删除:", response.data);
          alert(`${this.username} 账户已被删除`);
          // 重定向到登录页面或其他页面
          this.$router.push("/login");
        }
      } catch (error) {
        console.error("注销账户时发生错误:", error);
        alert("删除账户失败，请稍后再试。");
      }
    },
  },
};
</script>

<style scoped>
/* 容器样式 */
.user-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  text-align: center;
}

/* 信息框容器样式 */
.info-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
}

/* 用户信息框样式 */
.user-info-box {
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* 输入框样式 */
.input-field {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid #ced4da;
  font-size: 1rem;
}

.input-field2 {
  width: 100%;
  height: 100px;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid #ced4da;
  vertical-align: top;
  font-size: 1rem;
  text-align: left; /* 内容左对齐 */
  box-sizing: border-box; /* 确保 padding 不影响实际宽度和高度 */
  resize: none; /* 可选，禁用用户调整文本区域大小 */
}

/* 操作按钮的样式 */
.action-buttons {
  display: flex;
  justify-content: space-between;
}

.save-btn,
.delete-btn {
  padding: 10px 20px;
  font-size: 1.1rem;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease;
}

.save-btn {
  background-color: #28a745;
  color: white;
}

.save-btn:hover {
  background-color: #218838;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
}

.delete-btn:hover {
  background-color: #c82333;
}
</style>