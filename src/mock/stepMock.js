/**
 * @description：
 * @date: 2021-07-29 15:20
 */

 import Mock from 'mockjs';

 const data= [
     {
         id:  111,
         name: Mock.mock('@cname'),
         path: Mock.mock('/method/findMethod'),
         dataType:"post",
         testcaseId: 11
     },
     {
        id:  Mock.mock('@id'),
        name: Mock.mock('@cname'),
        path: Mock.mock('/testcase/findTestcase'),
        dataType:"post",
        testcaseId: 11
    },
    {
        id:  Mock.mock('@id'),
        name: Mock.mock('@cname'),
        path: Mock.mock('/step/findStep'),
        dataType:"post",
        testcaseId: 11
    },
 ]
 
 
 let findStepPage = (value) => {
     
     let array = []
     const body = JSON.parse(value.body);
     data.forEach((item,index) => {
         if(item.testcaseId === Number(body.testcaseId) ) {
             array.push(item)
         }
     })
     return {
         code:0,
         data : {dataList:array},
     }
 }
 Mock.mock("/step/findStepPage", findStepPage);
 
 let findStep = (values) => {
     const value = JSON.parse(values.body);
     const dataList = []
     data.forEach((item,index)=>{
         if(item.id === Number(value.id)){
             dataList.push(item)
         }
     })
 
     return{
         code:0,
         data:dataList[0]
     }
 }
 Mock.mock("/step/findStep", findStep);
 
 
 let deleteStep =  (values)=>{
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
 Mock.mock("/step/deleteStep", deleteStep);
 
 
 let createStep = (values) => {
     const value = JSON.parse(values.body);
     let newitem ={
        id:Mock.mock('@id'),
        name: value.name,
        dataType:value.dataType,
        path: value.path,
        testcaseId: Number(value.testcaseId)
     }
     data.push(newitem);
     return {
         code:0,
         data: data
     }
 }
 Mock.mock("/step/createStep", createStep);
 
 
 let updateStep = (values) => {
     let value = JSON.parse(values.body);
     value.testcaseId=Number(value.testcaseId)
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
 Mock.mock("/step/updateStep", updateStep);
 