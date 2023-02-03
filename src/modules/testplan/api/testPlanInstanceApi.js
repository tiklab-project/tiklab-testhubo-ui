import {Axios as service} from "tiklab-core-ui";



export function deleteTestPlanInstance(data){
    return service.request({
        url: "/testPlanInstance/deleteTestPlanInstance",
        method: "post",
        data
    })
}

export function createTestPlanInstance(data){
    return service.request({
        url: "/testPlanInstance/createTestPlanInstance",
        method: "post",
        data
    })
}

export function updateTestPlanInstance(data){
    return service.request({
        url: "/testPlanInstance/updateTestPlanInstance",
        method: "post",
        data
    })
}

export function findTestPlanInstance(data){
    return service.request({
        url: "/testPlanInstance/findTestPlanInstance",
        method: "post",
        data
    })
}

export function findTestPlanInstanceList(data){
    return service.request({
        url: "/testPlanInstance/findTestPlanInstanceList",
        method: "post",
        data
    })
}

export function findTestPlanInstancePage(data){
    return service.request({
        url: "/testPlanInstance/findTestPlanInstancePage",
        method: "post",
        data
    })
}
