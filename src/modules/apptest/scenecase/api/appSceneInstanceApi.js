import {Axios as service} from "doublekit-core-ui";

export function deleteAppSceneInstance(data){
    return service.request({
        url: "/appSceneInstance/deleteAppSceneInstance",
        method: "post",
        data
    })
}

export function createAppSceneInstance(data){
    return service.request({
        url: "/appSceneInstance/createAppSceneInstance",
        method: "post",
        data
    })
}

export function updateAppSceneInstance(data){
    return service.request({
        url: "/appSceneInstance/updateAppSceneInstance",
        method: "post",
        data
    })
}

export function findAppSceneInstance(data){
    return service.request({
        url: "/appSceneInstance/findAppSceneInstance",
        method: "post",
        data
    })
}

export function findAppSceneInstanceList(data){
    return service.request({
        url: "/appSceneInstance/findAppSceneInstanceList",
        method: "post",
        data
    })
}

export function findAppSceneInstancePage(data){
    return service.request({
        url: "/appSceneInstance/findAppSceneInstancePage",
        method: "post",
        data
    })
}
