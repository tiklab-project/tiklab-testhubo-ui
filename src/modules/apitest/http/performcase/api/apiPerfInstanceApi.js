import {Axios as service} from "doublekit-core-ui";

export function deleteApiPerfInstance(data){
    return service.request({
        url: "/apiPerfInstance/deleteApiPerfInstance",
        method: "post",
        data
    })
}

export function createApiPerfInstance(data){
    return service.request({
        url: "/apiPerfInstance/createApiPerfInstance",
        method: "post",
        data
    })
}

export function updateApiPerfInstance(data){
    return service.request({
        url: "/apiPerfInstance/updateApiPerfInstance",
        method: "post",
        data
    })
}

export function findApiPerfInstance(data){
    return service.request({
        url: "/apiPerfInstance/findApiPerfInstance",
        method: "post",
        data
    })
}

export function findApiPerfInstanceList(data){
    return service.request({
        url: "/apiPerfInstance/findApiPerfInstanceList",
        method: "post",
        data
    })
}

export function findApiPerfInstancePage(data){
    return service.request({
        url: "/apiPerfInstance/findApiPerfInstancePage",
        method: "post",
        data
    })
}
