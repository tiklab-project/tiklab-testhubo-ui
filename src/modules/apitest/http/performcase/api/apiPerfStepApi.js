import {Axios as service} from "doublekit-core-ui";

export function deleteApiPerfStep(data){
    return service.request({
        url: "/apiPerfStep/deleteApiPerfStep",
        method: "post",
        data
    })
}

export function createApiPerfStep(data){
    return service.request({
        url: "/apiPerfStep/createApiPerfStep",
        method: "post",
        data
    })
}

export function findApiPerfStep(data){
    return service.request({
        url: "/apiPerfStep/findApiPerfStep",
        method: "post",
        data
    })
}

export function updateApiPerfStep(data){
    return service.request({
        url: "/apiPerfStep/updateApiPerfStep",
        method: "post",
        data
    })
}

export function findApiPerfStepPage(data){
    return service.request({
        url: "/apiPerfStep/findApiPerfStepPage",
        method: "post",
        data
    })
}

export function findApiPerfStepList(data){
    return service.request({
        url: "/apiPerfStep/findApiPerfStepList",
        method: "post",
        data
    })
}

export function bindApiScene(data){
    return service.request({
        url: "/apiPerfStep/bindApiScene",
        method: "post",
        data
    })
}


