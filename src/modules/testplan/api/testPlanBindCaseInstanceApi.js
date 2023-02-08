import {Axios as service} from "tiklab-core-ui";



export function deleteTestPlanBindCaseInstance(data){
    return service.request({
        url: "/testPlanCaseInstanceBind/deleteTestPlanCaseInstanceBind",
        method: "post",
        data
    })
}

export function createTestPlanBindCaseInstance(data){
    return service.request({
        url: "/testPlanCaseInstanceBind/createTestPlanCaseInstanceBind",
        method: "post",
        data
    })
}

export function updateTestPlanBindCaseInstance(data){
    return service.request({
        url: "/testPlanCaseInstanceBind/updateTestPlanCaseInstanceBind",
        method: "post",
        data
    })
}

export function findTestPlanBindCaseInstance(data){
    return service.request({
        url: "/testPlanCaseInstanceBind/findTestPlanCaseInstanceBind",
        method: "post",
        data
    })
}

export function findTestPlanBindCaseInstanceList(data){
    return service.request({
        url: "/testPlanCaseInstanceBind/findTestPlanCaseInstanceBindList",
        method: "post",
        data
    })
}

export function findTestPlanBindCaseInstancePage(data){
    return service.request({
        url: "/testPlanCaseInstanceBind/findTestPlanCaseInstanceBindPage",
        method: "post",
        data
    })
}
