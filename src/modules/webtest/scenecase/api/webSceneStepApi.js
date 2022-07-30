import {Axios as service} from "tiklab-core-ui";

export function deleteWebSceneStep(data){
    return service.request({
        url: "/webSceneStep/deleteWebSceneStep",
        method: "post",
        data
    })
}

export function createWebSceneStep(data){
    return service.request({
        url: "/webSceneStep/createWebSceneStep",
        method: "post",
        data
    })
}

export function findWebSceneStep(data){
    return service.request({
        url: "/webSceneStep/findWebSceneStep",
        method: "post",
        data
    })
}

export function updateWebSceneStep(data){
    return service.request({
        url: "/webSceneStep/updateWebSceneStep",
        method: "post",
        data
    })
}

export function findWebSceneStepPage(data){
    return service.request({
        url: "/webSceneStep/findWebSceneStepPage",
        method: "post",
        data
    })
}

export function findWebSceneStepList(data){
    return service.request({
        url: "/webSceneStep/findWebSceneStepList",
        method: "post",
        data
    })
}

export function bindWebUnit(data){
    return service.request({
        url: "/webSceneStep/bindWebUnit",
        method: "post",
        data
    })
}

