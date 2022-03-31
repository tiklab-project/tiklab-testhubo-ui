import Mock from 'mockjs';

const data= [
    {
        id: 11,
        name: Mock.mock('@cname'),
        level: "L1",
        testType:"API",
        createUser: {name:'USER'},
        updateUser:{name:'USER'},
        category:{name:'USER'},
        updateTime:Mock.mock("@datetime"),
        categoryId:1,
        nodeList:[
            {
                id:1233,
                name:"客户机1",
                url:"192.168.10.16:8080",
                status:"online"
            },{
                id:125533,
                name:"客户机2",
                url:"192.168.10.16:8080",
                status:"online"
            },{
                id:1243433,
                name:"客户机3",
                url:"192.168.10.16:8080",
                status:"online"
            },
            {
                id:1255633,
                name:"客户机4",
                url:"192.168.10.16:8080",
                status:"online"
            }
        ]
    },
    {
        id: 113,
        name: Mock.mock('@cname'),
        createUser: {name:'USER'},
        updateUser:{name:'USER'},
        category:{name:'USER'},
        updateTime:Mock.mock("@datetime"),
        level: "L1",
        testType:"API",
        categoryId:1,

    },
    {
        id: 1133,
        name: Mock.mock('@cname'),
        level: "L4",
        testType:"API",
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
Mock.mock("/apiPerform/findApiPerformPage", findTestcasePage);

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
Mock.mock("/apiPerform/findApiPerformList", findTestcaseList);


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
Mock.mock("/apiPerform/findApiPerform", findTestcase);


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
