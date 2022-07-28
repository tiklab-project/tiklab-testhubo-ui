import {Axios as service} from "doublekit-core-ui";

export function createAssertParam(data){
    return service.request({
        url: "/assertParam/createAssertParam",
        method: "post",
        data
    })
}

export function updateAssertParam(data){
    return service.request({
        url: "/assertParam/updateAssertParam",
        method: "post",
        data
    })
}

export function deleteAssertParam(data){
    return service.request({
        url: "/assertParam/deleteAssertParam",
        method: "post",
        data
    })
}

export function findAssertParam(data){
    return service.request({
        url: "/assertParam/findAssertParam",
        method: "post",
        data
    })
}

export function findAssertParamList(data){
    return service.request({
        url: "/assertParam/findAssertParamList",
        method: "post",
        data
    })
}

