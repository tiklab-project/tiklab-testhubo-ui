import {Axios as service} from "tiklab-core-ui";

export function deleteWebEnv(data){
    return service.request({
        url: "/webEnv/deleteWebEnv",
        method: "post",
        data 
    })
}

export function createWebEnv(data){
    return service.request({
        url: "/webEnv/createWebEnv",
        method: "post",
        data 
    })
}

export function findWebEnv(data){
    return service.request({
        url: "/webEnv/findWebEnv",
        method: "post",
        data 
    })
}

export function updateWebEnv(data){
    return service.request({
        url: "/webEnv/updateWebEnv",
        method: "post",
        data 
    })
}

export function findWebEnvPage(data){
    return service.request({
        url: "/webEnv/findWebEnvPage",
        method: "post",
        data 
    })
}

export function findWebEnvList(data){
    return service.request({
        url: "/webEnv/findWebEnvList",
        method: "post",
        data 
    })
}
