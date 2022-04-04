import Mock from 'mockjs';

const data= [
    {
        id: 11,
        name: Mock.mock('@cname'),
        level: "L1",
        testType:"WEB",
        createUser: {name:'USER'},
        updateUser:{name:'USER'},
        category:{name:'USER'},
        updateTime:Mock.mock("@datetime"),
        categoryId:1
    },
    {
        id: 113,
        name: Mock.mock('@cname'),
        createUser: {name:'USER'},
        updateUser:{name:'USER'},
        category:{name:'USER'},
        updateTime:Mock.mock("@datetime"),
        level: "L2",
        testType:"WEB",
        categoryId:1
    },
    {
        id: 1133,
        name: Mock.mock('@cname'),
        level: "L4",
        testType:"WEB",
        createUser: {name:'USER'},
        updateUser:{name:'USER'},
        category:{name:'USER'},
        updateTime:Mock.mock("@datetime"),
        categoryId:1
    },
]


let findTestcasePage = (value) => {
    // let array = []
    // const body = JSON.parse(value.body);
    // data.forEach((item,index) => {
    //     if(item.projectId === Number(body.projectId) ) {
    //         array.push(item)
    //     }
    // })
    return {
        code:0,
        data : {dataList:data},
    }
}
Mock.mock("/webUnit/findWebUnitPage", findTestcasePage);

let findTestcaseList = (value) => {
    // let array = []
    // const body = JSON.parse(value.body);
    // data.forEach((item,index) => {
    //     if(item.projectId === Number(body.projectId) ) {
    //         array.push(item)
    //     }
    // })
    return {
        code:0,
        data : data,
    }
}
Mock.mock("/testInstance/findTestInstanceList", findTestcaseList);


let findTestcase = (values) => {

    let bodyObj = {}
    for(let [key,value] of values.body.entries()){
        let obj = {};
        obj[key]=value;
        bodyObj=obj
    }
    const dataList = []
    data.forEach((item,index)=>{
        if(item.id === Number(bodyObj.id)){
            dataList.push(item)
        }
    })

    return{
        code:0,
        data:dataList[0]
    }
}
Mock.mock("/webUnit/findWebUnit", findTestcase);


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
