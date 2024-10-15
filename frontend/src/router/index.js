import { createRouter, createWebHistory } from 'vue-router'; // Vue Router 4 中的导入方式
import Home_fuc from '../views/Home_fuc.vue';
import Login from '../views/Login_fuc.vue';
import Register from '../views/Register_fuc.vue';
import Data from '../views/Data_fuc.vue';

const routes = [
  { path: '/', name: 'Home', component: Home_fuc },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/data', name: 'Data', component: Data }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // 使用 HTML5 历史模式
  routes,
});

export default router;
