import {Axios as service} from "tiklab-core-ui";

export function findTestPlanPage(data){
    return service.request({
        url: "/testPlan/findTestPlanPage",
        method: "post",
        data
    })
}

export function findTestPlan(data){
    return service.request({
        url: "/testPlan/findTestPlan",
        method: "post",
        data
    })
}

export function createTestPlan(data){
    return service.request({
        url: "/testPlan/createTestPlan",
        method: "post",
        data
    })
}

export function deleteTestPlan(data){
    return service.request({
        url: "/testPlan/deleteTestPlan",
        method: "post",
        data
    })
}

export function updateTestPlan(data){
    return service.request({
        url: "/testPlan/updateTestPlan",
        method: "post",
        data
    })
}
