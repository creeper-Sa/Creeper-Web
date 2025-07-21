<template>
    <el-aside :width="width">
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          :collapse="isCollapse"
          :collapse-transition="false"
          :default-active="activeMenu"
          >
            <h3 v-show="!isCollapse">商电后台管理系统</h3>
             <h3 v-show="isCollapse">后台</h3>
            <el-menu-item 
              v-for="item in noChildren"
              :index="item.path"
              :key="item.path"
              @click="handleMenu(item)"
            >
              <component class="icons" :is="item.icon"></component>
              <span>{{ item.label }}</span>
            </el-menu-item>
            <el-sub-menu 
              v-for="item in hasChildren"
              :index="item.path"
              :key="item.path"
            >
              <template #title>
                <component class="icons" :is="item.icon"></component>
                <span>{{ item.label }}</span>
              </template>
              <el-menu-item-group >
                <el-menu-item
                  v-for="subItem in item.children"
                  :index="subItem.path"
                  :key="subItem.path"
                  @click="handleMenu(subItem)"
                >
                  <component class="icons" :is="subItem.icon"></component>
                  <span>{{ subItem.label }}</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>

          </el-menu>
    </el-aside>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useAllDataStore } from '@/store'
import { useRouter,useRoute } from 'vue-router';
import { MenuItem } from '@/interface/Interface';
const allDataStore = useAllDataStore();
//先引入静态数据
// const list =ref([
//           {
//           path: '/home',
//           name: 'home',
//           label: '首页',
//           icon: 'house',
//           url: 'Home'
//           },
//         {
//             path: '/mall',
//             name: 'mall',
//             label: '商品管理',
//             icon: 'video-play',
//             url: 'Mall'
//         },
//         {
//             path: '/user',
//             name: 'user',
//             label: '员工管理',
//             icon: 'user',
//             url: 'User'
//         },
//         {
//             path: 'other',
//             label: '其他',
//             icon: 'location',
//             children: [
//                 {
//                     path: '/page1',
//                     name: 'page1',
//                     label: '页面1',
//                     icon: 'setting',
//                     url: 'Page1'
//                 },
//                 {
//                     path: '/page2',
//                     name: 'page2',
//                     label: '页面2',
//                     icon: 'setting',
//                     url: 'Page2'
//                 }
//             ]
//         }
// ])
const list = computed<MenuItem[]>(() => allDataStore.state.menuList);
const noChildren = computed(() => list.value.filter((item): item is MenuItem => !item.children));
const hasChildren = computed(() => list.value.filter((item): item is MenuItem & { children: MenuItem[] } => !!item.children));
const isCollapse = computed(()=>allDataStore.state.isCollapse);

//标题宽度
const width = computed(()=>allDataStore.state.isCollapse ? '64px' : '180px');
//更新路由
const activeMenu = computed(()=>route.path)
//tag标签
const router = useRouter();
const route = useRoute();


//获取路由标签
const handleMenu = (item: { path: string; name: string; label: string; icon: string; url: string; })=>{
  router.push(item.path)
  allDataStore.selectMenu(item);
}
</script>

<style lang="less" scoped>

.icons{
    width:18px;
    height:18px;
    margin-right:5px;
}
.el-menu{
    border-right:none;
    h3{
        line-height:48px;
        color:#fff;
        text-align:center;
    }
}
.el-aside{
    height:100%;
    background-color:#545c64;
}
</style>