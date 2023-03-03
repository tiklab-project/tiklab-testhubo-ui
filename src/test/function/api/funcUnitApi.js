import {Axios as service} from "tiklab-core-ui";

export function findFuncUnitCaseListByTestCase(data){
    return service.request({
        url: "/funcUnitCase/findFuncUnitCaseListByTestCase",
        method: "post",
        data
    })
}


export function findFuncUnitPage(data){
    return service.request({
        url: "/funcUnitCase/findFuncUnitCasePage",
        method: "post",
        data
    })
}

export function findFuncUnit(data){
    return service.request({
        url: "/funcUnitCase/findFuncUnitCase",
        method: "post",
        data
    })
}

export function createFuncUnit(data){
    return service.request({
        url: "/funcUnitCase/createFuncUnitCase",
        method: "post",
        data
    })
}

export function deleteFuncUnit(data){
    return service.request({
        url: "/funcUnitCase/deleteFuncUnitCase",
        method: "post",
        data
    })
}

export function updateFuncUnit(data){
    return service.request({
        url: "/funcUnitCase/updateFuncUnitCase",
        method: "post",
        data
    })
}
