// import {Axios as service} from "doublekit-core-ui";

import service from "../../../../common/utils/localrequest";
import "../../../../mock/webUnitMock"

export function findWebUnitPage(data){
    return service.request({
        url: "/webUnit/findWebUnitPage",
        method: "post",
        data
    })
}

export function findWebUnit(data){
    return service.request({
        url: "/webUnit/findWebUnit",
        method: "post",
        data
    })
}

export function createWebUnit(data){
    return service.request({
        url: "/webUnit/createWebUnit",
        method: "post",
        data
    })
}

export function deleteWebUnit(data){
    return service.request({
        url: "/webUnit/deleteWebUnit",
        method: "post",
        data
    })
}

export function updateWebUnit(data){
    return service.request({
        url: "/webUnit/updateWebUnit",
        method: "post",
        data
    })
}
