import {Axios as service} from "doublekit-core-ui";

export function deleteWebPerfStep(data){
    return service.request({
        url: "/webPerfStep/deleteWebPerfStep",
        method: "post",
        data
    })
}

export function createWebPerfStep(data){
    return service.request({
        url: "/webPerfStep/createWebPerfStep",
        method: "post",
        data
    })
}

export function findWebPerfStep(data){
    return service.request({
        url: "/webPerfStep/findWebPerfStep",
        method: "post",
        data
    })
}

export function updateWebPerfStep(data){
    return service.request({
        url: "/webPerfStep/updateWebPerfStep",
        method: "post",
        data
    })
}

export function findWebPerfStepPage(data){
    return service.request({
        url: "/webPerfStep/findWebPerfStepPage",
        method: "post",
        data
    })
}

export function findWebPerfStepList(data){
    return service.request({
        url: "/webPerfStep/findWebPerfStepList",
        method: "post",
        data
    })
}

export function bindWebScene(data){
    return service.request({
        url: "/webPerfStep/bindWebScene",
        method: "post",
        data
    })
}


