import {Axios as service} from "doublekit-core-ui";

export function deleteApiPerf(data){
    return service.request({
        url: "/apiPerfCase/deleteApiPerfCase",
        method: "post",
        data
    })
}

export function createApiPerf(data){
    return service.request({
        url: "/apiPerfCase/createApiPerfCase",
        method: "post",
        data
    })
}

export function updateApiPerf(data){
    return service.request({
        url: "/apiPerfCase/updateApiPerfCase",
        method: "post",
        data
    })
}

export function findApiPerf(data){
    return service.request({
        url: "/apiPerfCase/findApiPerfCase",
        method: "post",
        data
    })
}

export function findApiPerfList(data){
    return service.request({
        url: "/apiPerfCase/findApiPerfCaseList",
        method: "post",
        data
    })
}

export function findApiPerfPage(data){
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





