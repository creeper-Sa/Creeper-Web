/**
 * 整个项目api的统一管理
 */

import request from "./request";

//请求首页左侧的表格数据

export default {
    getTableData(){
        return request({
            url:'/home/getTableData',
            method:'get',
            mock:true,
        });
    },
    getCountData(){
        return request({
            url:'/home/getCountData',
            method:'get',
            mock:true,
        });
    },
    getChartData(){
        return request({
            url:'/home/getChartData',
            method:'get',
            mock:true,
        });
    },
    getUserData(data:any){
        return request({
            url:'/user/getUserData',
            method:'get',
            mock:true,
            data,
        });
    },
    deleteUserData(data:any){
        return request({
            url:'/user/deleteUser',
            method:'get',
            mock:true,
            data,
        });
    },
    addUserData(data:any){
        return request({
            url:'/user/addUser',
            method:'post',
            mock:true,
            data,
        });
    },
    updateUserData(data:any){
        return request({
            url:'/user/updateUser',
            method:'post',
            mock:true,
            data,
        });
    },
};