import { createApp } from 'vue';
import App from './App.vue';
import "@/assets/less/index.less";
import router from './router';
//ElementPlus的按需导入
// import ElementPlus from 'element-plus';
// import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia';
import '@/api/mock.ts';
import api from './api/api';
import 'element-plus/dist/index.css'
import { useAllDataStore } from './store';


const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
const store = useAllDataStore();
store.addMenu(router,'refresh');
app.config.globalProperties.$api = api;
app.use(router);


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// app.use(ElementPlus);
app.mount('#app');
