import { createApp } from 'vue'; // 从 'vue' 导入 createApp 函数
import App from './App.vue'; // 导入根组件 App
import router from './router'; // 导入路由配置

// 创建应用实例，并挂载到 DOM 中的 #app 元素
createApp(App).use(router).mount('#app');

