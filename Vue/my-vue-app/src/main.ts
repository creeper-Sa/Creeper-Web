import { createApp } from 'vue';
import App from './App.vue';
import "@/assets/less/index.less";
import router from './router';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { createPinia } from 'pinia';
import '@/api/mock.ts';
import api from './api/api';
import 'element-plus/dist/index.css';
import { useAllDataStore } from './store';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);

const store = useAllDataStore();

router.beforeEach((to, from) => {
  const store = useAllDataStore();
  
  if (to.path !== '/login' && !store.state.token) {
    return { name: 'login' };
  }
  
  if (to.path !== '/login' && !router.resolve(to).matched.length) {
    // 路由不存在，跳404
    return { name: '404' };
  }
  
  // 放行
  return true;
});


store.addMenu(router, 'refresh');

app.config.globalProperties.$api = api;
app.use(router);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount('#app');
