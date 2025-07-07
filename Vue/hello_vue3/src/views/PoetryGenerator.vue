  <template>
    <div class="poetry-generator appear">
      <h1>✨ AI 古诗生成器 ✨</h1>

      <div class="form-group">
        <label for="charInput">起始字</label>
        <br>
        <input
          id="charInput"
          v-model="inputChar"
          maxlength="1"
          placeholder="请输入一个汉字"
          spellcheck="false"
          autofocus
        />
        <br>
      </div>

      <div class="form-group">
        <label for="styleSelect">诗体选择</label>
        <br>
        <select id="styleSelect" v-model="inputStyle">
          <option value="五言绝句">五言诗词</option>
          <option value="七言绝句">七言绝句</option>
        </select>
        <br>
      </div>

      <div class="form-group">
        <label for="modelSelect">模型选择</label>
        <br>
        <select id="modelSelect" v-model="modelType">
          <option value="rnn">RNN 模型</option>
          <option value="transformer">Transformer 模型</option>
        </select>
      </div>

      <button :disabled="loading" @click="getPoetry" class="generate-btn">
        <span v-if="loading" class="spinner"></span>
        {{ loading ? '生成中...' : '生成诗句' }}
      </button>

      <transition name="fade">
        <div v-if="output" class="result-box">
          <h2>生成结果</h2>
          <pre>{{ output }}</pre>
        </div>
      </transition>
    </div>
  </template>

  <script setup lang="ts">
  import { ref } from 'vue'
  import axios from 'axios'

  const inputChar = ref('')
  const inputStyle = ref('五言绝句')
  const modelType = ref('rnn')
  const output = ref('')
  const loading = ref(false)

  const getPoetry = async () => {
    if (!inputChar.value.trim()) {
      output.value = '⚠️ 请输入一个汉字作为起始字'
      return
    }
    loading.value = true
    output.value = ''
    try {
      const res = await axios.post('/predict', {
        input_char: inputChar.value.trim(),
        input_style: inputStyle.value,
        // model_type: modelType.value,
      })
      output.value = res.data.output || '未生成内容，请重试'
    } catch (error) {
      output.value = '❌ 请求失败，请检查后端服务'
    } finally {
      loading.value = false
    }
  }
  </script>

  <style scoped>
  .poetry-generator {
    position: relative;
    height: 800px;
    max-width: 600px;  /* 宽度稍微小一点 */
    margin: 0 auto;
    padding: 2rem 2.5rem; /* 缩小内边距 */
    background: linear-gradient(135deg, #6a11cb, #2575fc);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    text-align: center;
    user-select: none;
    animation: fadeInUp 0.5s ease-out;
    box-sizing: border-box;
  }

  h1 {
    margin-top: 50px;
    font-weight: 700;
    font-size: 2.8rem;  /* 缩小标题字号 */
    margin-bottom: 40px;
    line-height: 1.2;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }

  input,
  select {
    width: 200px;
    padding: 0.35rem 0.7rem;  /* 缩小内边距 */
    font-size: 1rem;          /* 缩小字体 */
    border: 1.5px solid rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    outline: none;
    background: rgba(255, 255, 255, 0.15);
    color: black;
    box-sizing: border-box;
    transition: border-color 0.3s ease, background-color 0.3s ease;
    font-family: inherit;
    margin-bottom: 1.2rem; /* 每个控件间距 */
    
  }

  input::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  input:focus,
  select:focus {
    border-color: #f0ad4e;
    box-shadow: 0 0 8px #f0ad4e88;
    background: rgba(255, 255, 255, 0.3);
  }

  .generate-btn {
    width: 200px;
    padding: 14px 40px;    /* 缩小按钮尺寸 */
    background: #ffffff;
    color: #2575fc;
    border: none;
    border-radius: 28px;   /* 边角稍微小一点 */
    font-size: 1.2rem;     /* 缩小按钮字体 */
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 10px 24px rgba(255, 255, 255, 0.3);
    transition: all 0.3s ease;
  }

  .generate-btn:hover {
    background: #e0e7ff;
    color: #1d4ed8;
    transform: translateY(-3px);
    box-shadow: 0 14px 36px rgba(255, 255, 255, 0.4);
  }

  /* 动画 */
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(40px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  /* 响应式 */
  @media (max-width: 600px) {
    .poetry-generator {
      max-width: 100%;
      margin: 1.5rem 1rem;
      padding: 1.2rem 1.5rem;
    }

    h1 {
      font-size: 2rem;
      margin-bottom: 30px;
    }

    input,
    select {
      font-size: 0.95rem;
      padding: 0.3rem 0.6rem;
    }

    .generate-btn {
      font-size: 1rem;
      padding: 12px 36px;
      border-radius: 24px;
    }
  }

  .result-box {
    margin-top: 1.5rem;
    border-radius: 12px;
    padding: 1rem 1.5rem;
    font-size: 1.1rem;
    color: #fff;
    white-space: pre-wrap; /* 支持多行换行 */
    text-align: left;
    box-shadow: 0 0 12px white;
  }

  </style>
