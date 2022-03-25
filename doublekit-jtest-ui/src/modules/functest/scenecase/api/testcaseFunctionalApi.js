import {Axios as service} from "doublekit-core-ui";


export function deleteTestCaseFunctional(data){
    return service.request({
        url: "/testCaseFunctional/deleteTestCaseFunctional",
        method: "post",
        data
    })
}

export function createTestCaseFunctional(data){
    return service.request({
        url: "/testCaseFunctional/createTestCaseFunctional",
        method: "post",
        data
    })
}

export function findTestCaseFunctional(data){
    return service.request({
        url: "/testCaseFunctional/findTestCaseFunctional",
        method: "post",
        data
    })
}

export function updateTestCaseFunctional(data){
    return service.request({
        url: "/testCaseFunctional/updateTestCaseFunctional",
        method: "post",
        data
    })
}

export function findTestCaseFunctionalPage(data){
    return service.request({
        url: "/testCaseFunctional/findTestCaseFunctionalPage",
        method: "post",
        data
    })
}

export function findTestCaseFunctionalList(data){
    return service.request({
        url: "/testCaseFunctional/findTestCaseFunctionalList",
        method: "post",
        data
    })
}
