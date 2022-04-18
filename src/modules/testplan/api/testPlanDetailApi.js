import {Axios as service} from "doublekit-core-ui";

export function findReleTestCase(data){
    return service.request({
        url: "/testPlanDetail/findReleTestCase",
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

export function createTestPlanDetaillList(data){
    return service.request({
        url: "/testPlanDetail/createTestPlanDetaillList",
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

export function findTesCase(data){
    return service.request({
        url: "/testPlanDetail/findTesCase",
        method: "post",
        data
    })
}