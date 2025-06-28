
//定义一个person接口
export interface personInterface {
    id:string,
    name:string,
    age:number
}

//也可以自定义接口
export type Persons = Array<personInterface>