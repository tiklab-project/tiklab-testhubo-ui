import {Axios as service} from "doublekit-core-ui";

export function findStepPage(data){
    return service.request({
        url: "/step/findStepPage",
        method: "post",
        data
    })
}

export function findStep(data){
    return service.request({
        url: "/step/findStep",
        method: "post",
        data
    })
}

export function createStep(data){
    return service.request({
        url: "/step/createStep",
        method: "post",
        data
    })
}

export function deleteStep(data){
    return service.request({
        url: "/step/deleteStep",
        method: "post",
        data
    })
}

export function updateStep(data){
    return service.request({
        url: "/step/updateStep",
        method: "post",
        data
    })
}
