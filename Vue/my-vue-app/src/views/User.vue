<script setup lang="ts">
import {  ElMessage, ElMessageBox } from 'element-plus'
import { getCurrentInstance, onMounted, reactive, ref } from 'vue'

const tableData = ref([]);
const tableLabel = reactive([
    {
        prop:'name',
        label:'姓名',
    },
    {
        prop:'sex',
        label:'性别',
    },
    {
        prop:'age',
        label:'年龄',
    },
    {
        prop:'birth',
        label:'出生日期',
        width:200,
    },
        {
        prop:'addr',
        label:'地址',
        width:400,
    },
]);
//查询功能
const config = reactive({
    name:'',
    total:0,
    page:1,
});
//分页次数
const pageSize = ref(16);

const instance = getCurrentInstance();
const proxy = instance!.proxy! ;
const getUserData = async ()=>{
    let res = await proxy.$api.getUserData({
    name: config.name,
    page: config.page,
    limit: pageSize.value,
  });
    tableData.value = res.list.map((item:any)=>({
        ...item,
        sex: item.sex === 1 ? '女' : '男' ,
    }))
    config.total = res.count;

}

const handleClick = () => {
  console.log('click')
}

const formInline = reactive({
    keyWord:''
})

const handleSearch = ()=>{
    config.name = formInline.keyWord;
    getUserData();
}
const handleCurrentChange = (page: number) => {
    config.page = page;
    getUserData();
}

const handleDelete = async (row: any) => {
  console.log('要删除的用户id：', row.id);
  ElMessageBox.confirm('您确定要删除吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    try {
      const res = await proxy.$api.deleteUserData({ id: row.id });
      console.log('删除接口返回:', res);
      ElMessage.success('删除成功');
      getUserData();
    } 
    catch (err) {
      console.error('删除失败:', err);
      ElMessage.error('删除失败，请稍后再试');
    }
  }).catch(() => {
    console.log('用户点击取消，或 confirm 抛出错误');
    ElMessage.info('已取消删除');
  });
};


onMounted(()=>{
    getUserData();
})



</script>

<template>
    <div class="user-header">
        <el-button type="primary">新增</el-button>
        <el-form :inline="true" :model="formInline">
            <el-form-item label="请输入">
                <el-input placeholder="请输入用户姓名" v-model="formInline.keyWord"></el-input>
            </el-form-item>
            <el-form-item >
                 <el-button type="primary" @click="handleSearch">搜索</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="table">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column 
                v-for="item in tableLabel" :key="item.prop"
                :width="item.width ? item.width : 120"
                :prop="item.prop"
                :label="item.label"
            />
            <el-table-column fixed="right" label="操作" min-width="120" >
            <template #="scope">
                <el-button  type="primary" size="small" @click="handleClick">
                    编辑
                </el-button>
                <el-button  type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <div class="pager">
            <el-pagination
                :page-size="pageSize"
                size="default"
                :background="true"
                layout="prev, pager, next, jumper"
                :total="config.total"
                @current-change="handleCurrentChange"
            />
        </div>
    </div>

</template>

<style scoped lang="less">
.user-header{
   display:flex;
   justify-content:space-between;
}
.table {
    display: flex;
    flex-direction: column;
    height: 750px; 
}

.el-table {
    flex: 1;      /* 表格自动填满剩余空间 */
    width: 100%;
    overflow: auto; /* 内容超出时滚动 */
}

.pager {
    margin-top: 10px;
    display: flex;
    justify-content: center;
}


</style>