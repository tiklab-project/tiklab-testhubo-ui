import {Axios as service} from "doublekit-core-ui";


export function deleteApiPerfSceneConfig(data){
    return service.request({
        url: "/apiPerfSceneConfig/deleteApiPerfSceneConfig",
        method: "post",
        data
    })
}

export function createApiPerfSceneConfig(data){
    return service.request({
        url: "/apiPerfSceneConfig/createApiPerfSceneConfig",
        method: "post",
        data
    })
}

export function updateApiPerfSceneConfig(data){
    return service.request({
        url: "/apiPerfSceneConfig/updateApiPerfSceneConfig",
        method: "post",
        data
    })
}

export function findApiPerfSceneConfig(data){
    return service.request({
        url: "/apiPerfSceneConfig/findApiPerfSceneConfig",
        method: "post",
        data
    })
}

export function findApiPerfSceneConfigList(data){
    return service.request({
        url: "/apiPerfSceneConfig/findApiPerfSceneConfigList",
        method: "post",
        data
    })
}

export function findApiPerfSceneConfigPage(data){
    return service.request({
        url: "/apiPerfSceneConfig/findApiPerfSceneConfigPage",
        method: "post",
        data
    })
}
export function bindApiScene(data){
    return service.request({
        url: "/apiPerfSceneConfig/bindApiScene",
        method: "post",
        data
    })
}

