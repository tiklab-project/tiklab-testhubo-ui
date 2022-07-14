/**
 * @description：
 * @date: 2021-09-03 13:32
 */
import {Axios as service} from "doublekit-core-ui";

export function findAppUnitStepList(data){
    return service.request({
        url: "/appUnitStep/findAppUnitStepList",
        method: "post",
        data
    })
}

export function findAppUnitStep(data){
    return service.request({
        url: "/appUnitStep/findAppUnitStep",
        method: "post",
        data
    })
}

export function createAppUnitStep(data){
    return service.request({
        url: "/appUnitStep/createAppUnitStep",
        method: "post",
        data
    })
}

export function deleteAppUnitStep(data){
    return service.request({
        url: "/appUnitStep/deleteAppUnitStep",
        method: "post",
        data
    })
}

export function updateAppUnitStep(data){
    return service.request({
        url: "/appUnitStep/updateAppUnitStep",
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
