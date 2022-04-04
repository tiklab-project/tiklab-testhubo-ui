// import {Axios as service} from "doublekit-core-ui";
import service from "../../../../common/utils/localrequest";
import "../../../../mock/funcUnitStepMock"

export function deleteFuncUnitStep(data){
    return service.request({
        url: "/funcUnitStep/deleteFuncUnitStep",
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

export function findFuncUnitStep(data){
    return service.request({
        url: "/funcUnitStep/findFuncUnitStep",
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

export function findFuncUnitStepPage(data){
    return service.request({
        url: "/funcUnitStep/findFuncUnitStepPage",
        method: "post",
        data
    })
}

export function findFuncUnitStepList(data){
    return service.request({
        url: "/funcUnitStep/findFuncUnitStepList",
        method: "post",
        data
    })
}
