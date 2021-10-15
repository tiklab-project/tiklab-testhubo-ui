/**
 * @description：
 * @date: 2021-07-29 15:20
 */

 import Mock from 'mockjs';

 const data= [
     {
         id: 11,
         name: Mock.mock('@cname'),
         desc: Mock.mock('@name'),
         dataType:"接口",
         projectId:1
     },
     {
        id:  Mock.mock('@id'),
        name: Mock.mock('@cname'),
        desc: Mock.mock('@name'),
        dataType:"WEB",
        projectId:1
    },
    {
        id:  Mock.mock('@id'),
        name: Mock.mock('@cname'),
        desc: Mock.mock('@name'),
        dataType:"APP",
        projectId:1
    },
 ]
 
 
 let findTestcasePage = (value) => {
     let array = []
     const body = JSON.parse(value.body);
     data.forEach((item,index) => {
         if(item.projectId === Number(body.projectId) ) {
             array.push(item)
         }
     })
     return {
         code:0,
         data : {dataList:array},
     }
 }
 Mock.mock("/testcase/findTestcasePage", findTestcasePage);
 
 let findTestcase = (values) => {
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
 Mock.mock("/testcase/findTestcase", findTestcase);
 
 
 let deleteTestcase =  (values)=>{
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
 Mock.mock("/testcase/deleteTestcase", deleteTestcase);
 
 
 let createTestcase = (values) => {
     const value = JSON.parse(values.body);
     let newitem ={
        id:Mock.mock('@id'),
        name: value.name,
        dataType:value.dataType,
        desc: value.desc,
        projectId:Number(value.projectId),

     }
     data.push(newitem);
     return {
         code:0,
         data: data
     }
 }
 Mock.mock("/testcase/createTestcase", createTestcase);
 
 
 let updateTestcase = (values) => {
     let value = JSON.parse(values.body);
     value.projectId=Number(value.projectId)
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
 Mock.mock("/testcase/updateTestcase", updateTestcase);
 