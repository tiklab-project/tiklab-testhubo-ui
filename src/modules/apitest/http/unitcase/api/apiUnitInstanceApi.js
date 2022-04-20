import {Axios as service} from "doublekit-core-ui";

export function deleteApiUnitInstance(data){
    return service.request({
        url: "/apiUnitInstance/deleteApiUnitInstance",
        method: "post",
        data
    })
}

export function createApiUnitInstance(data){
    return service.request({
        url: "/apiUnitInstance/createApiUnitInstance",
        method: "post",
        data
    })
}

export function updateApiUnitInstance(data){
    return service.request({
        url: "/apiUnitInstance/updateApiUnitInstance",
        method: "post",
        data
    })
}

export function findApiUnitInstance(data){
    return service.request({
        url: "/apiUnitInstance/findApiUnitInstance",
        method: "post",
        data
    })
}

export function findApiUnitInstanceList(data){
    return service.request({
        url: "/apiUnitInstance/findApiUnitInstanceList",
        method: "post",
        data
    })
}

export function findApiUnitInstancePage(data){
    return service.request({
        url: "/apiUnitInstance/findApiUnitInstancePage",
        method: "post",
        data
    })
}
