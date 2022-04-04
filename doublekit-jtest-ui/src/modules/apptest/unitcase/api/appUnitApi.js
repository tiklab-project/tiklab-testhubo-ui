// import {Axios as service} from "doublekit-core-ui";

import service from "../../../../common/utils/localrequest";
import "../../../../mock/appUnitMock"

export function findAppUnitPage(data){
    return service.request({
        url: "/appUnit/findAppUnitPage",
        method: "post",
        data
    })
}

export function findAppUnit(data){
    return service.request({
        url: "/appUnit/findAppUnit",
        method: "post",
        data
    })
}

export function createAppUnit(data){
    return service.request({
        url: "/appUnit/createAppUnit",
        method: "post",
        data
    })
}

export function deleteAppUnit(data){
    return service.request({
        url: "/appUnit/deleteAppUnit",
        method: "post",
        data
    })
}

export function updateAppUnit(data){
    return service.request({
        url: "/appUnit/updateAppUnit",
        method: "post",
        data
    })
}
