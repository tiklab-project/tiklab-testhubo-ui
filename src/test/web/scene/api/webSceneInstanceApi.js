import {Axios as service} from "tiklab-core-ui";



export function deleteWebSceneInstance(data){
    return service.request({
        url: "/webSceneInstance/deleteWebSceneInstance",
        method: "post",
        data
    })
}

export function createWebSceneInstance(data){
    return service.request({
        url: "/webSceneInstance/createWebSceneInstance",
        method: "post",
        data
    })
}

export function updateWebSceneInstance(data){
    return service.request({
        url: "/webSceneInstance/updateWebSceneInstance",
        method: "post",
        data
    })
}

export function findWebSceneInstance(data){
    return service.request({
        url: "/webSceneInstance/findWebSceneInstance",
        method: "post",
        data
    })
}

export function findWebSceneInstanceList(data){
    return service.request({
        url: "/webSceneInstance/findWebSceneInstanceList",
        method: "post",
        data
    })
}

export function findWebSceneInstancePage(data){
    return service.request({
        url: "/webSceneInstance/findWebSceneInstancePage",
        method: "post",
        data
    })
}
