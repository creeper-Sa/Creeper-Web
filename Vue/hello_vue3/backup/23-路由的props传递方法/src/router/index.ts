
//创建一个路由器，并暴露出去

//引入createRouter

import { createRouter, createWebHistory } from "vue-router"; 
//引入一个个可能要呈现的组件
import Home from "@/views/Home.vue";
import News from "@/views/News.vue";
import About from "@/views/About.vue";
import Detail from "@/views/Detail.vue";
//创建路由器
const router =createRouter({
    //路由器的工作模式2种，一种是hash 一种是history
    //指定路由器的工作模式
    // `history`模式
    // > 优点：`URL`更加美观，不带有`#`，更接近传统的网站`URL`。
    // > 缺点：后期项目上线，需要服务端配合处理路径问题，否则刷新会有`404`错误。

    // `hash`模式
    // > 优点：兼容性更好，因为不需要服务器端处理路径。
    // > 缺点：`URL`带有`#`不太美观，且在`SEO`优化方面相对较差。

    history:createWebHistory(),
    //路由创建必须用数组
    routes:[
        {
            //名称
            name:'zhuye',
            //路径
            path:'/home',
            component: Home
        },
        {
            //名称
            name:'xinwen',
            //路径
            path:'/news',
            component: News,
            //子集不用写`/`
            children:[
                {
                    // 备注1：传递`params`参数时，若使用`to`的对象写法，必须使用`name`配置项，不能用`path`。

                    // 备注2：传递`params`参数时，需要提前在规则中占位。
                    //使用params参数时，必须要用name属性,如果是非必须传递的，可以在path路径后面加上`?`
                    name:'news-detail',
                    path:'detail/:id/:title/:content?',
                    component:Detail,
                    //props传参方法
                    //第一种 props的布尔值写法，作用：把收到了每一组params参数，作为props传给Detail组件
                    // props:true

                    //第二种方法，使用props传递对象(很少用)
                    // props:{
                    //     a:1,
                    //     b:2,
                    //     c:3
                    // }

                    //第三种写法,props的函数写法，作用：把返回的对象中每一组key-value作为props传给Detail组件
                    //这种写法既可以传递params参数也可以传递query参数
                    props(route){
                        return route.params;
                    }
                    
                }
            ]
        },
        {
            //名称
            name:'about',
            //路径
            path:'/about',
            component: About
        }
    ]
})

//暴露出去router
export default router;