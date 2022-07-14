import {Axios as service} from "doublekit-core-ui";

export function deleteAppSceneStep(data){
    return service.request({
        url: "/appSceneStep/deleteAppSceneStep",
        method: "post",
        data
    })
}

export function createAppSceneStep(data){
    return service.request({
        url: "/appSceneStep/createAppSceneStep",
        method: "post",
        data
    })
}

export function findAppSceneStep(data){
    return service.request({
        url: "/appSceneStep/findAppSceneStep",
        method: "post",
        data
    })
}

export function updateAppSceneStep(data){
    return service.request({
        url: "/appSceneStep/updateAppSceneStep",
        method: "post",
        data
    })
}

export function findAppSceneStepPage(data){
    return service.request({
        url: "/appSceneStep/findAppSceneStepPage",
        method: "post",
        data
    })
}

export function findAppSceneStepList(data){
    return service.request({
        url: "/appSceneStep/findAppSceneStepList",
        method: "post",
        data
    })
}

export function bindAppUnit(data){
    return service.request({
        url: "/appSceneStep/bindAppUnit",
        method: "post",
        data
    })
}

