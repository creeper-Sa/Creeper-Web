<template>
   <div class="tags">
      <el-tag
        v-for="(tag,index) in tags"
        :key="tag.name"
        :closable="tag.name !== 'home'"
        :effect="route.name === tag.name ? 'dark' : 'plain'"
        @click="handleMenu(tag)"
        @close="handleClose(tag,index)"
      >
      {{ tag.label }}
      </el-tag>
   </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAllDataStore } from '@/store';
const store = useAllDataStore();
const tags = computed(()=>store.state.tags)
const route = useRoute();
const router = useRouter();
//实现点击标签跳转页面
const handleMenu = (tag: { path: string; name: string; label: string; icon: string; }) => {
  router.push(tag.name);
  store.selectMenu(tag);
}

const handleClose = (tag: { path: string; name: string; label: string; icon: string; }, index: number)=>{
  //通过pinia管理
  store.updataTags(tag);
  //如果点击的关闭标签不是对应的页面，直接进行删除即可
  if(tag.name !== route.name){
    return;
  }
  //如果当前关闭的标签是其对应的页面，则会返回到前一个页面上
  if(index === store.state.tags.length){
    store.selectMenu(tags.value[index-1]);
    const pre = tags.value[index-1].name;
    router.push(pre);

  }
  else{
    store.selectMenu(tags.value[index]);
    const pre = tags.value[index].name;
    router.push(pre);
  }
}
</script>

<style lang="less" scoped>
.tags{
  margin: 8px 0 0 20px;
}
.el-tag{
    margin-right:10px;
}

</style>