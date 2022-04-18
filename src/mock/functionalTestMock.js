/**
 * @description：
 * @date: 2021-08-24 16:19
 */

import Mock from 'mockjs';

const data= [
    {
        id:  1,
        name: Mock.mock('@cname'),
        level: '3',
        executor: Mock.mock('@cname'),
        desc: Mock.mock('@cparagraph(1)'),
        preDesc:Mock.mock('@cparagraph(1)'),
    },
    {
        id:  Mock.mock('@id'),
        name: Mock.mock('@cname'),
        level: '1',
        executor: Mock.mock('@cname'),
        desc: Mock.mock('@cparagraph(1)'),
        preDesc:Mock.mock('@cparagraph(1)'),
    },
    {
        id:  Mock.mock('@id'),
        name: Mock.mock('@cname'),
        level: '5',
        executor: Mock.mock('@cname'),
        desc: Mock.mock('@cparagraph(1)'),
        preDesc:Mock.mock('@cparagraph(1)'),
    },
]


let findFunctionalTestPage = () => {
    return {
        code:0,
        data : {dataList:data},
    }
}
Mock.mock("/unitcase/findFunctionalTestPage", findFunctionalTestPage);

let findFunctionalTest = (values) => {
    debugger
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
Mock.mock("/unitcase/findFunctionalTest", findFunctionalTest);


let deleteFunctionalTest =  (values)=>{
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
Mock.mock("/unitcase/deleteFunctionalTest", deleteFunctionalTest);


let createFunctionalTest = (values) => {
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
Mock.mock("/unitcase/createFunctionalTest", createFunctionalTest);


let updateFunctionalTest = (values) => {
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
Mock.mock("/unitcase/updateFunctionalTest", updateFunctionalTest);
