import {Axios as service} from "doublekit-core-ui";

export function deleteApiPerform(data){
    return service.request({
        url: "/apiPerfCase/deleteApiPerfCase",
        method: "post",
        data
    })
}

export function createApiPerform(data){
    return service.request({
        url: "/apiPerfCase/createApiPerfCase",
        method: "post",
        data
    })
}

export function updateApiPerform(data){
    return service.request({
        url: "/apiPerfCase/updateApiPerfCase",
        method: "post",
        data
    })
}

export function findApiPerform(data){
    return service.request({
        url: "/apiPerfCase/findApiPerfCase",
        method: "post",
        data
    })
}

export function findApiPerformList(data){
    return service.request({
        url: "/apiPerfCase/findApiPerfCaseList",
        method: "post",
        data
    })
}

export function findApiPerformPage(data){
    return service.request({
        url: "/apiPerfCase/findApiPerfCasePage",
        method: "post",
        data
    })
}

export function findApiPerfCaseListByTestCase(data){
    return service.request({
        url: "/apiPerfCase/findApiPerfCaseListByTestCase",
        method: "post",
        data
    })
}

