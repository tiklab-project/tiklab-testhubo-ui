import {Axios as service} from "doublekit-core-ui";

export function deleteAppPerfInstance(data){
    return service.request({
        url: "/appPerfInstance/deleteAppPerfInstance",
        method: "post",
        data
    })
}

export function createAppPerfInstance(data){
    return service.request({
        url: "/appPerfInstance/createAppPerfInstance",
        method: "post",
        data
    })
}

export function updateAppPerfInstance(data){
    return service.request({
        url: "/appPerfInstance/updateAppPerfInstance",
        method: "post",
        data
    })
}

export function findAppPerfInstance(data){
    return service.request({
        url: "/appPerfInstance/findAppPerfInstance",
        method: "post",
        data
    })
}

export function findAppPerfInstanceList(data){
    return service.request({
        url: "/appPerfInstance/findAppPerfInstanceList",
        method: "post",
        data
    })
}

export function findAppPerfInstancePage(data){
    return service.request({
        url: "/appPerfInstance/findAppPerfInstancePage",
        method: "post",
        data
    })
}
