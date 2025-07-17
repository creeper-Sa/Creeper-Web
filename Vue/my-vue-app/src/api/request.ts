import axios from "axios";
import { ElMessage } from "element-plus";
import config from "@/config";
const service = axios.create({
    baseURL:config.baseApi,
}
);

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
service.interceptors.response.use(
    (res)=>{
    const{ code,data,msg} = res.data;
    if(code === 200){
        return data;
    }
    else{
        ElMessage.error(msg || '发生未知错误')
        return Promise.reject(msg || '发生未知错误')
    }
}


);

function request(options:any){
    options.method = options.method || 'get';
    //关于get请求参数的调整
    if(options.method.toLowerCase() === 'get'){
        options.params = options.data;
    }

    //对mock的开关做一个处理
    //如果要用api中覆盖config中的mock做了一个处理
    let isMock = config.mock;
    if(typeof options.mock !== 'undefined'){
        isMock = options.mock;
    }

    //针对环境做一个处理
    //动态设置 Axios 的基础请求地址 当前运行的环境，可能是 'development' | 'test' | 'prod'
    if(config.env === 'prod'){
        //如果当前环境是生产环境（prod），就设置 Axios 请求基地址为 config.baseApi，以便请求真实线上接口。
        service.defaults.baseURL = config.baseApi;
    }else{
        service.defaults.baseURL = isMock ? config.mockApi : config.baseApi;
    }
    return service(options);
}

export default request;