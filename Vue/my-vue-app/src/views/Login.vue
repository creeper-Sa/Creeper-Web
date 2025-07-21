<script setup lang="ts">
import { getCurrentInstance, reactive } from 'vue';
import { useAllDataStore } from '@/store';
import { useRouter } from 'vue-router';
const loginForm = reactive({
  username: '',
  password: '',
  });

//获取到mock的拦截数据
const instance = getCurrentInstance();
const proxy = instance?.proxy;
//通过角色登录相对应的路由，用的是pinia集中管理 
const store = useAllDataStore();
const router = useRouter();
const handleLogin = async () => {
  const res = await proxy?.$api.getMenu(loginForm);
  // console.log('登录成功：', res);
  //拿到菜单以后
  store.updateMenuList(res.menuList);
  store.state.token = res.token;
  store.addMenu(router,'refresh');
  router.push('/home');
};

</script>


<template>
  <div class="body-login">
    <el-form :model="loginForm" class="login-container">
      <h1 class="login-title">电商后台管理系统</h1>

      <el-form-item>
        <el-input
          type="input"
          placeholder="请输入账号"
          v-model="loginForm.username"
          clearable
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="loginForm.password"
          show-password
          clearable
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" class="login-btn" @click="handleLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.body-login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #83a4d4, #b6fbff); /* 渐变背景 */
}

.login-container {
  width: 400px;
  padding: 40px 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.login-title {
  text-align: center;
  margin-bottom: 30px;
  font-size: 24px;
  color: #333;
  font-weight: bold;
  letter-spacing: 1px;
}

.login-btn {
  width: 100%;
  height: 40px;
  font-size: 16px;
  border-radius: 8px;
}
</style>
