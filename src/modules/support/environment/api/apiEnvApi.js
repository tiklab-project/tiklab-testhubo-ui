import {Axios as service} from "tiklab-core-ui";

export function deleteApiEnv(data){
    return service.request({
        url: "/apiEnv/deleteApiEnv",
        method: "post",
        data 
    })
}

export function createApiEnv(data){
    return service.request({
        url: "/apiEnv/createApiEnv",
        method: "post",
        data 
    })
}

export function findApiEnv(data){
    return service.request({
        url: "/apiEnv/findApiEnv",
        method: "post",
        data 
    })
}

export function updateApiEnv(data){
    return service.request({
        url: "/apiEnv/updateApiEnv",
        method: "post",
        data 
    })
}

export function findApiEnvPage(data){
    return service.request({
        url: "/apiEnv/findApiEnvPage",
        method: "post",
        data 
    })
}

export function findApiEnvList(data){
    return service.request({
        url: "/apiEnv/findApiEnvList",
        method: "post",
        data 
    })
}
