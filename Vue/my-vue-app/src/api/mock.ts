import Mock from 'mockjs'
import homeAip from './mockData/home'
//1.拦截的路径 2.拦截的方法 3.制造需要的数据
Mock.mock(/api\/home\/getTableData/,'get',homeAip.getTableData);
Mock.mock(/api\/home\/getCountData/,'get',homeAip.getCountData);
Mock.mock(/api\/home\/getChartData/,'get',homeAip.getChartData);
