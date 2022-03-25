/**
 * @description：
 * @date: 2021-09-03 13:32
 */
import {Axios as service} from "doublekit-core-ui";

export function findWebStepList(data){
    return service.request({
        url: "/webStep/findWebStepList",
        method: "post",
        data
    })
}

export function findWebStep(data){
    return service.request({
        url: "/webStep/findWebStep",
        method: "post",
        data
    })
}

export function createWebStep(data){
    return service.request({
        url: "/webStep/createWebStep",
        method: "post",
        data
    })
}

export function deleteWebStep(data){
    return service.request({
        url: "/webStep/deleteWebStep",
        method: "post",
        data
    })
}

export function updateWebStep(data){
    return service.request({
        url: "/webStep/updateWebStep",
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
