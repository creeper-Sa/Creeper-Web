<template >
    <div class="news-list">
        <ul>
            <li>编号: {{ id }}</li>
            <li>标题: {{ title }}</li>
            <li>内容: {{ content }}</li>
        </ul>
    </div>
</template>
<script lang="ts" setup name="Detail">
import { useRoute } from 'vue-router';

    const route = useRoute();
    //使用数组快速声明 prop 名，不带类型
    defineProps(['id','title','content']);

</script>

<style scoped>
    
</style>