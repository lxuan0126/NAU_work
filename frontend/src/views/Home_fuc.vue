/* eslint-disable */
<template>
  <div class="home-container">
    <div class="content">
      <h1>631-1 高阶作业</h1>
      <p>请选择进入 登录 或 注册 界面</p>
      <div class="button-group">
        <router-link to="/login">
          <button class="btn">登录</button>
        </router-link>
        <router-link to="/register">
          <button class="btn">注册</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home_fuc',
};
</script>

<style scoped>
/* 主页容器居中对齐 */
.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh; /* 视口高度 */
  background-color: #f5f5f5; /* 背景颜色 */
  font-family: 'Arial', sans-serif;
}

/* 内容区域 */
.content {
  text-align: center;
  background-color: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* 标题样式 */
h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
}

/* 说明文字样式 */
p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 30px;
}

/* 按钮组 */
.button-group {
  display: flex;
  justify-content: space-around;
}

/* 按钮样式 */
.btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 0 10px;
}

/* 按钮悬停效果 */
.btn:hover {
  background-color: #45a049;
}

/* 调整按钮在移动设备上的显示效果 */
@media (max-width: 600px) {
  .button-group {
    flex-direction: column;
  }
  .btn {
    margin-bottom: 15px;
  }
}
</style>
