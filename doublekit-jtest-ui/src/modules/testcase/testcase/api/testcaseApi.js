import {Axios as service} from "doublekit-core-ui";

export function findTestcasePage(data){
    return service.request({
        url: "/testCase/findTestCasePage",
        method: "post",
        data
    })
}

export function findTestcase(data){
    return service.request({
        url: "/testCase/findTestCase",
        method: "post",
        data
    })
}

export function createTestcase(data){
    return service.request({
        url: "/testCase/createTestCase",
        method: "post",
        data
    })
}

export function deleteTestcase(data){
    return service.request({
        url: "/testCase/deleteTestCase",
        method: "post",
        data
    })
}

export function updateTestcase(data){
    return service.request({
        url: "/testCase/updateTestCase",
        method: "post",
        data
    })
}

export function releModule(data){
    return service.request({
        url: "/testCase/releModule",
        method: "post",
        data
    })
}