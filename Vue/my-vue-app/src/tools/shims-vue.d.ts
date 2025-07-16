// src/shims-vue.d.ts
import { ComponentCustomProperties } from 'vue'
import { api } from './api'  // 这里改成你的 api 文件路径

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $api: typeof api
  }
}
