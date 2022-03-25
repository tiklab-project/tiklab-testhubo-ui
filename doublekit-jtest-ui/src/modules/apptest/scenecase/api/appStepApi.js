/**
 * @description：
 * @date: 2021-09-03 13:32
 */
import {Axios as service} from "doublekit-core-ui";

export function findAppStepList(data){
    return service.request({
        url: "/appStep/findAppStepList",
        method: "post",
        data
    })
}

export function findAppStep(data){
    return service.request({
        url: "/appStep/findAppStep",
        method: "post",
        data
    })
}

export function createAppStep(data){
    return service.request({
        url: "/appStep/createAppStep",
        method: "post",
        data
    })
}

export function deleteAppStep(data){
    return service.request({
        url: "/appStep/deleteAppStep",
        method: "post",
        data
    })
}

export function updateAppStep(data){
    return service.request({
        url: "/appStep/updateAppStep",
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
