/**
 * @description：
 * @date: 2021-09-03 13:32
 */
import {Axios as service} from "doublekit-core-ui";

export function findAppSceneStepList(data){
    return service.request({
        url: "/appSceneStep/findAppSceneStepList",
        method: "post",
        data
    })
}

export function findAppSceneStep(data){
    return service.request({
        url: "/appSceneStep/findAppSceneStep",
        method: "post",
        data
    })
}

export function createAppSceneStep(data){
    return service.request({
        url: "/appSceneStep/createAppSceneStep",
        method: "post",
        data
    })
}

export function deleteAppSceneStep(data){
    return service.request({
        url: "/appSceneStep/deleteAppSceneStep",
        method: "post",
        data
    })
}

export function updateAppSceneStep(data){
    return service.request({
        url: "/appSceneStep/updateAppSceneStep",
        method: "post",
        data
    })
}

//查询定位器
export function findAllLocation(data){
    return service.request({
        url: "/location/findAllLocation",
        method: "post",
        data
    })
}

//查询所有操作方法
export function findActionTypeList(data){
    return service.request({
        url: "/actionType/findActionTypeList",
        method: "post",
        data
    })
}
