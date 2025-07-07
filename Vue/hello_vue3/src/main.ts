//创建项目
import { createApp } from 'vue';
//引入根组件
import App from './App.vue';
//挂载路由
import router from "./router";
const app = createApp(App);

//引入路由
app.use(router);
//挂载整个应用到app容器中
app.mount('#app');