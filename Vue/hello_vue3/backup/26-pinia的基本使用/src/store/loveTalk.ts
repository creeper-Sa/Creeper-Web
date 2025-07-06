import axios from "axios";
import { nanoid } from "nanoid";
import { defineStore } from "pinia";
import { reactive } from "vue";

// export const useLoveTalkStore = defineStore('loveTalk',{
//   //选项式写法
//     actions:{
//         async addATalk(){
//               try {
//                 //这里url接口产生跨域问题，需要将本地服务器的vite做中转
//                 // 浏览器前端 --> 本地Vite服务器 --> 转发请求给第三方接口 --> 返回数据
//                 let result = await axios.get('/api/rand.qinghua?format=json');
//                 // console.log(result.data.content);
//                 let obj = {id:nanoid(), text:result.data.content};
//                 this.talkList.unshift(obj);

//               } catch (error: unknown) {
//                 if (axios.isAxiosError(error)) {
//                   // 这里 TypeScript 知道 error 是 AxiosError 类型了
//                   console.error('请求出错:', error.message);
//                   if (error.response) {
//                     console.error('响应状态码:', error.response.status);
//                     console.error('响应数据:', error.response.data);
//                   }
//                 } else {
//                   console.error('未知错误:', error);
//                 }
//               }
//         }
//     },
//     state(){
//         return { 
//           //如果json.parse中为null那么则会返回 []数组
//           talkList: JSON.parse(localStorage.getItem('loveTalk') as string) || [] 
//         }
//     }
// })

export const useLoveTalkStore= defineStore('loveTalk',()=>{
  //pinia的组合写法

  let talkList = reactive(JSON.parse(localStorage.getItem('loveTalk') as string) || [] );

  async function addTalk() {
    try {
        //这里url接口产生跨域问题，需要将本地服务器的vite做中转
        // 浏览器前端 --> 本地Vite服务器 --> 转发请求给第三方接口 --> 返回数据
        let result = await axios.get('/api/rand.qinghua?format=json');
        // console.log(result.data.content);
        let obj = {id:nanoid(), text:result.data.content};
        talkList.unshift(obj);

      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          // 这里 TypeScript 知道 error 是 AxiosError 类型了
          console.error('请求出错:', error.message);
          if (error.response) {
            console.error('响应状态码:', error.response.status);
            console.error('响应数据:', error.response.data);
          }
        } else {
          console.error('未知错误:', error);
        }
      }
  }
  
  return {addTalk,talkList};
});