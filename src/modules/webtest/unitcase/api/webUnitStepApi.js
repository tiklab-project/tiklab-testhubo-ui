/**
 * @description：
 * @date: 2021-09-03 13:32
 */
// import {Axios as service} from "doublekit-core-ui";

import service from "../../../../common/utils/localrequest";
import "../../../../mock/webUnitStepMock"

export function findWebUnitStepList(data){
    return service.request({
        url: "/webUnitStep/findWebUnitStepList",
        method: "post",
        data
    })
}

export function findWebUnitStep(data){
    return service.request({
        url: "/webUnitStep/findWebUnitStep",
        method: "post",
        data
    })
}

export function createWebUnitStep(data){
    return service.request({
        url: "/webUnitStep/createWebUnitStep",
        method: "post",
        data
    })
}

export function deleteWebUnitStep(data){
    return service.request({
        url: "/webUnitStep/deleteWebUnitStep",
        method: "post",
        data
    })
}

export function updateWebUnitStep(data){
    return service.request({
        url: "/webUnitStep/updateWebUnitStep",
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
