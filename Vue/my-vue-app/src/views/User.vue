<script setup lang="ts">
import {  ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus'
import { getCurrentInstance, nextTick, onMounted, reactive, ref } from 'vue'

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
//获取api信息
const instance = getCurrentInstance();
const proxy = instance!.proxy! ;
//更新数据
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

//桥梁，用于顶部搜索栏的交互
const formInline = reactive({
    keyWord:''
})
//搜索功能
const handleSearch = ()=>{
    config.name = formInline.keyWord;
    getUserData();
}
//分页功能
const handleCurrentChange = (page: number) => {
    config.page = page;
    getUserData();
}
//删除功能
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
//新增用户的实现
const action=ref('add');
const dialogVisible = ref(false);
const formUser = reactive({
  name:'',
  sex: 0,
  age: null,
  birth:'',
  addr:''
});
//表单的验证规则
const rules: FormRules = {
  name: [{ required: true, message: "姓名是必填项", trigger: "blur" }],
  age: [
    { required: true, message: "年龄是必填项", trigger: "blur" },
    { type: "number", message: "年龄必须是数字", trigger: "blur" }
  ],
  sex: [{ required: true, message: "性别是必选项", trigger: "change" }],
  birth: [{ required: true, message: "出生日期是必选项", trigger: "change" }],
  addr: [{ required: true, message: "地址是必填项", trigger: "blur" }]
};


const userFormRef = ref<FormInstance>();

const handleClose = ()=>{
    //获取重置表单
  dialogVisible.value = false;
}

const handleCancel = ()=>{
  dialogVisible.value = false;
}


const handleAdd = ()=>{
  dialogVisible.value = true;
  action.value = 'add';
  Object.assign(formUser, getEmptyUser());
  nextTick(() => {
    userFormRef.value?.clearValidate();
  });

}

//置空-新增前清空 
const getEmptyUser = () => ({
  name: '',
  age: '',
  sex: 0,
  birth: '',
  addr: ''
});

const timeFormat = (time: string | number | Date): string => {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

//提交,通过el-form中的响应式ref数据返回
const onSubmit = () => {
  if (!userFormRef.value) return;
  userFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      let res = null;
      formUser.birth = /^\d{4}-\d{2}-\d{2}$/.test(formUser.birth) ? formUser.birth : timeFormat(formUser.birth);
      if (action.value === 'add') {
        console.log('提交用户信息:', formUser);
        // 提交逻辑放这里
        res = await proxy.$api.addUserData(formUser);
      }
      else{
         res = await proxy.$api.updateUserData(formUser);
      }
      if(res){
        dialogVisible.value = false;
        userFormRef.value?.resetFields();
        getUserData();
      }
    } 
    else {
      ElMessage.warning('请完善表单信息');
    }
  });
};

//更新数据
const handleUpdata = (row: any) => {
  action.value = 'update';
  dialogVisible.value = true;
  nextTick(()=>{
    Object.assign(formUser,{...row,sex:''+ row.sex});
  })
}

onMounted(()=>{
    getUserData();
})

</script>

<template>
    <div class="user-header">
        <el-button type="primary" @click="handleAdd">新增</el-button>
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
                <el-button  type="primary" size="small" @click="handleUpdata(scope.row)">
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
    <el-dialog
    v-model="dialogVisible"
    :title="action == 'add' ? '新增用户' : '编辑用户'"
    width="35%"
    :before-close="handleClose"
    >
       <!--需要注意的是设置了:inline="true"，
        会对el-select的样式造成影响，我们通过给他设置一个class=select-clearn
        在css进行处理-->
    <el-form :inline="true"  :model="formUser" :rules="rules" ref="userFormRef">
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="formUser.name" placeholder="请输入姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年龄" prop="age">
            <el-input v-model.number="formUser.age" placeholder="请输入年龄" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item class="select-clearn" label="性别" prop="sex">
            <el-select  v-model="formUser.sex" placeholder="请选择">
              <el-option label="男" :value="0" />
              <el-option label="女" :value="1" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出生日期" prop="birth">
            <el-date-picker
              v-model="formUser.birth"
              type="date"
              placeholder="请输入"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item
          label="地址"
          prop="addr"
        >
          <el-input v-model="formUser.addr" placeholder="请输入地址" />
        </el-form-item>
      </el-row>
      <el-row style="justify-content: flex-end">
        <el-form-item>
          <el-button type="primary" @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </el-dialog>

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

.select-clearn{
    display: flex;
}

</style>