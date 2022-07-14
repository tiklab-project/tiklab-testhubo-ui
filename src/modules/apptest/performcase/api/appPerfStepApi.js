import {Axios as service} from "doublekit-core-ui";

export function deleteAppPerfStep(data){
    return service.request({
        url: "/appPerfStep/deleteAppPerfStep",
        method: "post",
        data
    })
}

export function createAppPerfStep(data){
    return service.request({
        url: "/appPerfStep/createAppPerfStep",
        method: "post",
        data
    })
}

export function findAppPerfStep(data){
    return service.request({
        url: "/appPerfStep/findAppPerfStep",
        method: "post",
        data
    })
}

export function updateAppPerfStep(data){
    return service.request({
        url: "/appPerfStep/updateAppPerfStep",
        method: "post",
        data
    })
}

export function findAppPerfStepPage(data){
    return service.request({
        url: "/appPerfStep/findAppPerfStepPage",
        method: "post",
        data
    })
}

export function findAppPerfStepList(data){
    return service.request({
        url: "/appPerfStep/findAppPerfStepList",
        method: "post",
        data
    })
}

export function bindAppScene(data){
    return service.request({
        url: "/appPerfStep/bindAppScene",
        method: "post",
        data
    })
}


