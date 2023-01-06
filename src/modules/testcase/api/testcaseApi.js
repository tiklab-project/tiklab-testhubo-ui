import {Axios as service} from "tiklab-core-ui";


export function findTestCasePage(data){
    return service.request({
        url: "/testCase/findTestCasePage",
        method: "post",
        data
    })
}


export function findTestCaseList(data){
    return service.request({
        url: "/testCase/findTestCaseList",
        method: "post",
        data
    })
}

export function findTestCase(data){
    return service.request({
        url: "/testCase/findTestCase",
        method: "post",
        data
    })
}

export function createTestCase(data){
    return service.request({
        url: "/testCase/createTestCase",
        method: "post",
        data
    })
}

export function deleteTestCase(data){
    return service.request({
        url: "/testCase/deleteTestCase",
        method: "post",
        data
    })
}

export function updateTestCase(data){
    return service.request({
        url: "/testCase/updateTestCase",
        method: "post",
        data
    })
}

