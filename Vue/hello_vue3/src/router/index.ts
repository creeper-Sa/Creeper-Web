
import { createWebHistory,createRouter } from "vue-router";

import Login from "@/views/Login.vue";
import PoetryGenerator from "@/views/PoetryGenerator.vue";

const router = createRouter({

   history: createWebHistory(),
   routes:[
      {
         path:'/',
         name:'login',
         component:Login
      },

      {
         path:'/generator',
         name:'poetryGenerator',
         component:PoetryGenerator
      }
   ]
}
)
export default router;