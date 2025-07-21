import Mock from 'mockjs'
import homeAip from './mockData/home'
import userApi from './mockData/user'
import menuApi from './mockData/permission';
//1.拦截的路径 2.拦截的方法 3.制造需要的数据
Mock.mock(/api\/home\/getTableData/,'get',homeAip.getTableData);
Mock.mock(/api\/home\/getCountData/,'get',homeAip.getCountData);
Mock.mock(/api\/home\/getChartData/,'get',homeAip.getChartData);
Mock.mock(/api\/user\/getUserData/,"get", userApi.getUserList);
Mock.mock(/api\/user\/deleteUser/,"get", userApi.deleteUser);
Mock.mock(/api\/user\/addUser/,"post", userApi.createUser);
Mock.mock(/api\/user\/updateUser/,"post", userApi.updateUser);
Mock.mock(/permission\/getMenu/,"post", menuApi.getMenu);