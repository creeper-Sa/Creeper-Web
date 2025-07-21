import { createRouter,createWebHashHistory } from "vue-router";


//制定路由
const routes = [
    {
        path:'/',
        name:'main',
        component:()=>import('@/views/Main.vue'),
        redirect:'/home',
        children:[
            
        ]
    },
    {
        path:'/login',
        name:'login',
        component:()=>import('@/views/Login.vue')
    },
    {
        path:'/404',
        name:'404',
        component:()=>import('@/views/404.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/404.vue')
    }

];
//创建路由器
const router = createRouter({
    history:createWebHashHistory(),
    routes,
});

//暴露路由器
export default router;