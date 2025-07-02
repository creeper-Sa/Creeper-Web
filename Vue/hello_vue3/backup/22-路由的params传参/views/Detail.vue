<template >
    <div class="news-list">
        <ul>
            <li>编号: {{ route.params.id }}</li>
            <li>标题: {{ route.params.title }}</li>
            <li>内容: {{ route.params.content }}</li>
        </ul>
    </div>
</template>
<script lang="ts" setup name="Detail">
import { useRoute } from 'vue-router';


    const route = useRoute();
</script>

<style scoped>
    
</style>