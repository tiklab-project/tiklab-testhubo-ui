/**
 * @description：
 * @date: 2021-08-24 16:19
 */

import Mock from 'mockjs';

const data= [
    {
        id:  1,
        name: Mock.mock('@cname'),
        thread: Mock.mock('@word'),
        frequency: Mock.mock('@word'),
    },
    {
        id:  Mock.mock('@id'),
        name: Mock.mock('@cname'),
        thread: Mock.mock('@word'),
        frequency: Mock.mock('@word'),
    },
    {
        id:  Mock.mock('@id'),
        name: Mock.mock('@cname'),
        thread: Mock.mock('@word'),
        frequency: Mock.mock('@word'),
    },
]


let findPerformancePage = (value) => {
    return {
        code:0,
        data : {dataList:data},
    }
}
Mock.mock("/performanceTest/findPerformanceTestPage", findPerformancePage);

let findPerformance = (values) => {
    const value = JSON.parse(values.body);
    let dataList = []
    data.map((item,index)=>{
        if(item.id === Number(value.id)){
            dataList.push(item)
        }
    })

    return{
        code:0,
        data:dataList[0]
    }
}
Mock.mock("/performanceTest/findPerformanceTest", findPerformance);


let deletePerformance =  (values)=>{
    let apiindex = "";
    const value = JSON.parse(values.body);
    data.map((item,index)=>{
        if(item.id === String(value.id)){
            apiindex = index;
        }
    })
    data.splice(apiindex,1)
    return {
        code:0,
        data : {dataList:data},
    }
}
Mock.mock("/performanceTest/deletePerformanceTest", deletePerformance);


let createPerformance = (values) => {
    const value = JSON.parse(values.body);
    let newitem ={
        id:Mock.mock('@id'),
        name:value.name,
        thread: value.thread,
        frequency:value.frequency
    }
    data.push(newitem);
    return {
        code:0,
        data: data
    }
}
Mock.mock("/performanceTest/createPerformanceTest", createPerformance);


let updatePerformance = (values) => {
    debugger
    let value = JSON.parse(values.body);
    let apiindex = ""
    data.map((item,index)=>{
        if(item.id === value.id){
            apiindex = index
        }
    })
    data[apiindex] = value
    return {
        code:0,
        data: data
    }
}
Mock.mock("/performanceTest/updatePerformanceTest", updatePerformance);
