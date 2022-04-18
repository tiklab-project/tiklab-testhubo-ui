import Mock from 'mockjs';

const data= [
    {
        id: 11,
        name: Mock.mock('@cname'),
        createTime: Mock.mock('@datetime'),
        unitNum:"3",
        result:1,
        sceneNum:"3",
        pass:"50%",
        passNum:"1",
        outNum:"2",
        unitList:[
            {
                id: "step451",
                result:"1",
                stepNum:"3",
                pass:"50%",
                passNum:"2",
                outNum:"2",
                stepList:[
                    {
                        id: "step1",
                        actionType:"open",
                        parament:"url/a/b/c",
                        location:"",
                        locationPrice:"",
                        result:"1"
                    },
                    {
                        id: "step2",
                        actionType:"click",
                        parament:"",
                        location:"id",
                        locationPrice:"btn",
                        result:"1"
                    },
                    {
                        id: "step3",
                        actionType:"click",
                        parament:"",
                        location:"className",
                        locationPrice:"css",
                        result:"0"
                    },
                ]
            },
            {
                id: "st4535ep1",
                result:"1",
                stepNum:"3",
                pass:"50%",
                passNum:"2",
                outNum:"2",
                stepList:[
                    {
                        id: "step1",
                        actionType:"open",
                        parament:"url/a/b/c",
                        location:"",
                        locationPrice:"",
                        result:"1"
                    },
                    {
                        id: "step2",
                        actionType:"click",
                        parament:"",
                        location:"id",
                        locationPrice:"btn",
                        result:"1"
                    },
                    {
                        id: "step3",
                        actionType:"click",
                        parament:"",
                        location:"className",
                        locationPrice:"css",
                        result:"0"
                    },
                ]
            },
            {
                id: "step34531",
                result:"1",
                stepNum:"3",
                pass:"50%",
                passNum:"2",
                outNum:"2",
                stepList:[
                    {
                        id: "step1",
                        actionType:"open",
                        parament:"url/a/b/c",
                        location:"",
                        locationPrice:"",
                        result:"1"
                    },
                    {
                        id: "step2",
                        actionType:"click",
                        parament:"",
                        location:"id",
                        locationPrice:"btn",
                        result:"1"
                    },
                    {
                        id: "step3",
                        actionType:"click",
                        parament:"",
                        location:"className",
                        locationPrice:"css",
                        result:"0"
                    },
                ]
            },
        ],
        num:4,
        scenecaseId:1
    },
    {
        id: 12321,
        name: Mock.mock('@cname'),
        createTime: Mock.mock('@datetime'),
        unitNum:"3",
        result:"1",
        sceneNum:"4",
        pass:"50%",
        passNum:"2",
        outNum:"2",
        unitList:[
            {
                id: "ste2343p1",
                result:"1",
                sceneNum:"3",
                pass:"50%",
                passNum:"2",
                outNum:"2",
                stepList:[
                    {
                        id: "ste44332p1",
                        actionType:"open",
                        parament:"url/a/b/c",
                        location:"",
                        locationPrice:"",
                        result:"1"
                    },
                    {
                        id: "ste5454p2",
                        actionType:"click",
                        parament:"",
                        location:"id",
                        locationPrice:"btn",
                        result:"1"
                    },
                    {
                        id: "36363",
                        actionType:"click",
                        parament:"",
                        location:"className",
                        locationPrice:"css",
                        result:"0"
                    },
                ]
            },
            {
                id: "ste3453p2",
                name: Mock.mock('@cname'),
                createTime: Mock.mock('@datetime'),
                result:1,
                time:"200ms",
                requestType:"get",
                statusCode:"100",
                requestInstance:{
                    requestBase:"http://www.doublekit.com"
                },
            },
            {
                id: "step64643",
                name: Mock.mock('@cname'),
                createTime: Mock.mock('@datetime'),
                result:0,
                time:"200ms",
                requestType:"post",
                statusCode:"500",
                requestInstance:{
                    requestBase:"http://www.baidu.com"
                },
            },
        ],
        num:4,
        scenecaseId:1
    },
    {
        id: 11343,
        name: Mock.mock('@cname'),
        createTime: Mock.mock('@datetime'),
        unitNum:"3",
        result:"1",
        sceneNum:"4",
        pass:"50%",
        passNum:"2",
        outNum:"2",
        unitList:[
            {
                id: "step122",
                result:"1",
                sceneNum:"3",
                pass:"50%",
                passNum:"2",
                outNum:"2",
                stepList:[
                    {
                        id: "step143",
                        actionType:"open",
                        parament:"url/a/b/c",
                        location:"",
                        locationPrice:"",
                        result:"1"
                    },
                    {
                        id: "step243",
                        actionType:"click",
                        parament:"",
                        location:"id",
                        locationPrice:"btn",
                        result:"1"
                    },
                    {
                        id: "step2343",
                        actionType:"click",
                        parament:"",
                        location:"className",
                        locationPrice:"css",
                        result:"0"
                    },
                ]
            },
            {
                id: "step223424",
                name: Mock.mock('@cname'),
                createTime: Mock.mock('@datetime'),
                result:1,
                time:"200ms",
                requestType:"get",
                statusCode:"100",
                requestInstance:{
                    requestBase:"http://www.doublekit.com"
                },
            },
            {
                id: "ste2342p3",
                name: Mock.mock('@cname'),
                createTime: Mock.mock('@datetime'),
                result:0,
                time:"200ms",
                requestType:"post",
                statusCode:"500",
                requestInstance:{
                    requestBase:"http://www.baidu.com"
                },
            },
        ],
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
Mock.mock("/appSceneInstance/findAppSceneInstanceList", findTestcaseList);


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
Mock.mock("/appSceneInstance/findAppSceneInstance", findTestcase);


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
