//创建项目
import { createApp } from 'vue';
//引入根组件
import App from './App.vue';

//1.引入pinia
import { createPinia } from 'pinia';
const app = createApp(App);
//2.创建pinia最好是在app之后创建
const pinia = createPinia();

//3.安装pinia
app.use(pinia);
//挂载整个应用到app容器中
app.mount('#app');