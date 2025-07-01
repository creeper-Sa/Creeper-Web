import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';
export default function(){

    let dogList = reactive([
        'https://images.dog.ceo/breeds/pembroke/n02113023_3913.jpg'
    ])

    //同步代码->微任务代码->宏任务代码(setTimeout之类)
    //async表示异步执行，相当于微代码
    async function addDog(){
        //await 会暂停代码执行，直到 axios.get() 得到响应结果。
        try {        
            let result = await axios.get('https://dog.ceo/api/breed/pembroke/images/random');
            // console.log(result.data.message);
            dogList.push(result.data.message);
        }
        catch(err){
            console.log(err);
        }
        
    }

    //钩子挂载，一上来就想要获取一直狗
    onMounted(()=>{
        addDog();
    })
    return {dogList,addDog};
}


