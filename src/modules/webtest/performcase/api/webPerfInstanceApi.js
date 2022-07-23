import {Axios as service} from "doublekit-core-ui";

export function deleteWebPerfInstance(data){
    return service.request({
        url: "/webPerfInstance/deleteWebPerfInstance",
        method: "post",
        data
    })
}

export function createWebPerfInstance(data){
    return service.request({
        url: "/webPerfInstance/createWebPerfInstance",
        method: "post",
        data
    })
}

export function updateWebPerfInstance(data){
    return service.request({
        url: "/webPerfInstance/updateWebPerfInstance",
        method: "post",
        data
    })
}

export function findWebPerfInstance(data){
    return service.request({
        url: "/webPerfInstance/findWebPerfInstance",
        method: "post",
        data
    })
}

export function findWebPerfInstanceList(data){
    return service.request({
        url: "/webPerfInstance/findWebPerfInstanceList",
        method: "post",
        data
    })
}

export function findWebPerfInstancePage(data){
    return service.request({
        url: "/webPerfInstance/findWebPerfInstancePage",
        method: "post",
        data
    })
}
