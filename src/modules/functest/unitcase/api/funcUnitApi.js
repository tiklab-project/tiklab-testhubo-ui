// import {Axios as service} from "doublekit-core-ui";

import service from "../../../../common/utils/localrequest";
import "../../../../mock/funcUnitMock"

export function deleteFuncUnit(data){
    return service.request({
        url: "/funcUnit/deleteFuncUnit",
        method: "post",
        data
    })
}

export function createFuncUnit(data){
    return service.request({
        url: "/funcUnit/createFuncUnit",
        method: "post",
        data
    })
}

export function updateFuncUnit(data){
    return service.request({
        url: "/funcUnit/updateFuncUnit",
        method: "post",
        data
    })
}

export function findFuncUnit(data){
    return service.request({
        url: "/funcUnit/findFuncUnit",
        method: "post",
        data
    })
}

export function findFuncUnitList(data){
    return service.request({
        url: "/funcUnit/findFuncUnitList",
        method: "post",
        data
    })
}

export function findFuncUnitPage(data){
    return service.request({
        url: "/funcUnit/findFuncUnitPage",
        method: "post",
        data
    })
}
