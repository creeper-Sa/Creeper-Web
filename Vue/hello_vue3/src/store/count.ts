import {defineStore} from 'pinia';

//创建countStore并返回值sum
export const useCountStore = defineStore('count',{
    //对于actions中也可以限制判断调节，主要用于处理比较复杂但是重复的问题，以提升复用性
    actions:{
        increaseCount(value:number){

            if(this.sum<10){
                this.sum += value;
            }
            else{
                console.log('超过10无法增加');
            }
        }
    },
    state(){
        return {
            sum:1,
            id: 114514,
            name: 'BaiZi'
        }
    },
    getters:{
        //getters传值的方法有2种，一种用state传值，另一种是用this指针传值
        //state传值
        getMaxValue:(state):number=> state.sum * 10 ,

        //this指针传值
        changeID(state):number{
            return this.id;
        },
        changeName(state):string{
            return this.name.toUpperCase();
        }
    }
})