import {Axios as service} from "tiklab-core-ui";

export function deleteApiSceneStep(data){
    return service.request({
        url: "/apiSceneStep/deleteApiSceneStep",
        method: "post",
        data
    })
}

export function createApiSceneStep(data){
    return service.request({
        url: "/apiSceneStep/createApiSceneStep",
        method: "post",
        data
    })
}

export function updateApiSceneStep(data){
    return service.request({
        url: "/apiSceneStep/updateApiSceneStep",
        method: "post",
        data
    })
}

export function findApiSceneStep(data){
    return service.request({
        url: "/apiSceneStep/findApiSceneStep",
        method: "post",
        data
    })
}

export function findApiSceneStepList(data){
    return service.request({
        url: "/apiSceneStep/findApiSceneStepList",
        method: "post",
        data
    })
}

export function findApiSceneStepPage(data){
    return service.request({
        url: "/apiSceneStep/findApiSceneStepPage",
        method: "post",
        data
    })
}

export function bindApiUnit(data){
    return service.request({
        url: "/apiSceneStep/bindApiUnit",
        method: "post",
        data
    })
}

