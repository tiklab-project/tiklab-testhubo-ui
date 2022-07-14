import {Axios as service} from "doublekit-core-ui";


export function findWebPerfPage(data){
    return service.request({
        url: "/webPerfCase/findWebPerfCasePage",
        method: "post",
        data
    })
}

export function findWebPerf(data){
    return service.request({
        url: "/webPerfCase/findWebPerfCase",
        method: "post",
        data
    })
}

export function createWebPerf(data){
    return service.request({
        url: "/webPerfCase/createWebPerfCase",
        method: "post",
        data
    })
}

export function deleteWebPerf(data){
    return service.request({
        url: "/webPerfCase/deleteWebPerfCase",
        method: "post",
        data
    })
}

export function updateWebPerf(data){
    return service.request({
        url: "/webPerfCase/updateWebPerfCase",
        method: "post",
        data
    })
}

export function findWebPerfListByTestCase(data){
    return service.request({
        url: "/webPerfCase/findWebPerfCaseListByTestCase",
        method: "post",
        data
    })
}


