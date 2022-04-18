import Mock from 'mockjs';

const data= [
    {
        id: 11,
        name: Mock.mock('@cname'),
        createTime: Mock.mock('@datetime'),
        error:"58%",
        times:"200",
        thread:"5",
        stepList:[
            {
                id: "step1",
                name: Mock.mock('@cname'),
                createTime: Mock.mock('@datetime'),
                time:"200ms",
                result:1,
                requestInstance:{
                    requestBase:"http://www.baidu.com",
                    responseBody:"{\"account\":\"admin\",\"password\":\"123456\",\"userType\":\"1\"}",
                    responseHeader:"{\"contant-type\":\"json\"}",
                    requestBody:"{\"account\":\"admin\",\"password\":\"123456\",\"userType\":\"1\"}",
                },
                step:10,
                successNum:5,
                errorNum:5,
                passRate:"50%"
            },
            {
                id: "step2",
                name: Mock.mock('@cname'),
                createTime: Mock.mock('@datetime'),
                result:1,
                time:"200ms",
                requestType:"get",
                statusCode:"100",
                requestInstance:{
                    requestBase:"http://www.doublekit.com"
                },
                step:10,
                successNum:5,
                errorNum:5,
                passRate:"50%"
            },
            {
                id: "step3",
                name: Mock.mock('@cname'),
                createTime: Mock.mock('@datetime'),
                result:0,
                time:"200ms",
                requestType:"post",
                statusCode:"500",
                requestInstance:{
                    requestBase:"http://www.baidu.com"
                },
                step:10,
                successNum:5,
                errorNum:5,
                passRate:"50%"
            },
        ],
        result:1,
        num:4,
        scenecaseId:1
    },
    {
        id: 222,
        name: Mock.mock('@cname'),
        createTime: Mock.mock('@datetime'),
        result:1,
        time:"200ms",
        requestType:"get",
        num:4,

        scenecaseId:1
    },
    {
        id: 333,
        name: Mock.mock('@cname'),
        createTime: Mock.mock('@datetime'),
        result:0,
        time:"200ms",
        requestType:"post",
        num:4,

        scenecaseId:1
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
Mock.mock("/repository/findRepositoryPage", findTestcasePage);

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
Mock.mock("/apiPerformInstance/findApiPerformInstanceList", findTestcaseList);


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
Mock.mock("/apiPerformInstance/findApiPerformInstance", findTestcase);


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
