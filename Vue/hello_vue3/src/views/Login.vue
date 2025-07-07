<template>
  <div class="login-container">
    <div class="snow-container">
      <div v-for="n in 80" :key="n" class="snowflake">❄</div>
    </div>
    <div class="bg-particles"></div>
    <h1 class="title">欢迎进入<br />AI 古诗词生成器</h1>
    <button @click="goToGenerator" class="enter-btn">点击进入</button>
  </div>
</template>

<script setup name="Login" lang="ts">
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

//实现雪花飘落
onMounted(() => {
  const snowflakes = document.querySelectorAll('.snowflake')
  snowflakes.forEach((el: Element) => {
    const delay = Math.random() * 10
    const duration = 5 + Math.random() * 10
    const left = Math.random() * 100

    const style = el as HTMLElement
    style.style.left = `${left}%`
    style.style.animationDuration = `${duration}s`
    style.style.animationDelay = `${delay}s`
    style.style.fontSize = `${Math.random() * 10 + 8}px`
    style.style.opacity = `${Math.random() * 0.5 + 0.5}`
  })
})


const router = useRouter()

function goToGenerator() {
  router.push('/generator')
}
</script>

<style scoped>
/* 雪花样式 */
.snow-container {
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
}

.snowflake {
  position: absolute;
  top: -10px;
  color: #fff;
  font-size: 1rem;
  animation-name: fall;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  opacity: 0.8;
  user-select: none;
}

@keyframes fall {
  0% {
    transform: translateY(-10px) rotate(0deg);
    opacity: 0.8;
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
  }
}
/* 动态过度 */
.login-container {
  position: relative;
  height: 100vh;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  text-align: center;
  padding: 0 20px;
  color: #fff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.title {
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 50px;
  line-height: 1.2;
  animation: fadeInDown 1s ease-out;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.enter-btn {
  background: #ffffff;
  color: #2575fc;
  border: none;
  border-radius: 30px;
  padding: 16px 48px;
  font-size: 1.3rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 12px 30px rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  animation: fadeInUp 1s ease-out;
}

.enter-btn:hover {
  background: #e0e7ff;
  color: #1d4ed8;
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(255, 255, 255, 0.4);
}

.bg-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(circle, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
  background-size: 30px 30px;
  animation: float 10s linear infinite;
  z-index: 0;
}

h1,
button {
  z-index: 1;
}

@keyframes float {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100px 100px;
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 600px) {
  .title {
    font-size: 2rem;
  }

  .enter-btn {
    padding: 12px 30px;
    font-size: 1rem;
  }
}
</style>
