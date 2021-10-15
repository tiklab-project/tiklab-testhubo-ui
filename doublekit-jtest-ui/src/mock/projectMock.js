/**
 * @description：
 * @date: 2021-07-29 15:20
 */

 import Mock from 'mockjs';

 const data= [
     {
         id:  1,
         projectName: Mock.mock('@cname'),
         desc: Mock.mock('@name'),
     },
     {
        id:  Mock.mock('@id'),
        projectName: Mock.mock('@cname'),
        desc: Mock.mock('@name'),
    },
    {
        id:  Mock.mock('@id'),
        projectName: Mock.mock('@cname'),
        desc: Mock.mock('@name'),
    },
 ]
 
 
 let findProjectPage = (value) => {
     let array = []
     const body = JSON.parse(value.body);
    //  data.forEach((item,index) => {
    //      if(item.methodId === body.methodId ) {
    //          array.push(item)
    //      }
    //  })
     return {
         code:0,
         data : {dataList:data},
     }
 }
 Mock.mock("/repository/findProjectPage", findProjectPage);
 
 let findProject = (values) => {
     const value = JSON.parse(values.body);
     const dataList = []
     data.forEach((item,index)=>{
         if(item.id === value.id){
             dataList.push(item)
         }
     })
 
     return{
         code:0,
         data:dataList[0]
     }
 }
 Mock.mock("/repository/findProject", findProject);
 
 
 let deleteProject =  (values)=>{
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
 Mock.mock("/repository/deleteProject", deleteProject);
 
 
 let createProject = (values) => {
     debugger
     const value = JSON.parse(values.body);
     let newitem ={
         id:Mock.mock('@id'),
         projectName:value.projectName,
         desc: value.desc,
     }
     data.push(newitem);
     return {
         code:0,
         data: data
     }
 }
 Mock.mock("/repository/createProject", createProject);
 
 
 let updateProject = (values) => {
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
 Mock.mock("/repository/updateProject", updateProject);
 