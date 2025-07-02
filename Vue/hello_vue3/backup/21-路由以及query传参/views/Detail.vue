<template >
    <div class="news-list">
        <ul>
            <li>编号: {{ route.query.id }}</li>
            <li>标题: {{ route.query.title }}</li>
            <li>内容: {{ route.query.content }}</li>
        </ul>
    </div>
</template>
<script lang="ts" setup name="Detail">
import { useRoute } from 'vue-router';

    //接受所传递的参数
    //获取路由
    const route = useRoute();
    console.log(route.query);
</script>

<style scoped>
    
</style>