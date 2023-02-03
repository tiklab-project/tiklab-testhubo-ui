import {Axios as service} from "tiklab-core-ui";

export function findBindTestCaseList(data){
    return service.request({
        url: "/testPlanDetail/findBindTestCaseList",
        method: "post",
        data
    })
}

export function findTestPlanDetail(data){
    return service.request({
        url: "/testPlanDetail/findTestPlanDetail",
        method: "post",
        data
    })
}

export function createTestPlanDetailList(data){
    return service.request({
        url: "/testPlanDetail/createTestPlanDetailList",
        method: "post",
        data
    })
}

export function deleteTestPlanDetail(data){
    return service.request({
        url: "/testPlanDetail/deleteTestPlanDetail",
        method: "post",
        data
    })
}

export function updateTestPlanDetail(data){
    return service.request({
        url: "/testPlanDetail/updateTestPlanDetail",
        method: "post",
        data
    })
}

export function findTesCaseList(data){
    return service.request({
        url: "/testPlanDetail/findTesCaseList",
        method: "post",
        data
    })
}

export function testPlanTestDispatch(data){
    return service.request({
        url: "/testPlanTestDispatch/execute",
        method: "post",
        data
    })
}


export function testPlanExeResult(data){
    return service.request({
        url: "/testPlanTestDispatch/exeResult",
        method: "post",
        data
    })
}