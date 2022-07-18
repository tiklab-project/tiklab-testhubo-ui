/**
 * @description：
 * @date: 2021-09-03 13:32
 */
import {Axios as service} from "doublekit-core-ui";


export function findFuncUnitStepList(data){
    return service.request({
        url: "/funcUnitStep/findFuncUnitStepList",
        method: "post",
        data
    })
}

export function findFuncUnitStep(data){
    return service.request({
        url: "/funcUnitStep/findFuncUnitStep",
        method: "post",
        data
    })
}

export function createFuncUnitStep(data){
    return service.request({
        url: "/funcUnitStep/createFuncUnitStep",
        method: "post",
        data
    })
}

export function deleteFuncUnitStep(data){
    return service.request({
        url: "/funcUnitStep/deleteFuncUnitStep",
        method: "post",
        data
    })
}

export function updateFuncUnitStep(data){
    return service.request({
        url: "/funcUnitStep/updateFuncUnitStep",
        method: "post",
        data
    })
}

