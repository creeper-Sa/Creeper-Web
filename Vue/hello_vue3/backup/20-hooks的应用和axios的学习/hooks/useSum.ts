
import { onMounted, reactive, ref } from 'vue';

export default function(){
    let sum = ref(1);
    function add(){
        sum.value += 1;
    }

    //进行挂载，一上来就需要加100
    onMounted(()=>{
        sum.value += 100;
    });
    return {sum,add};
}