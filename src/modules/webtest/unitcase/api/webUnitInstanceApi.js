// import {Axios as service} from "doublekit-core-ui";

import service from "../../../../common/utils/localrequest";
import "../../../../mock/webUnitInstanceMock"

export function deleteWebUnitInstance(data){
    return service.request({
        url: "/webUnitInstance/deleteWebUnitInstance",
        method: "post",
        data
    })
}

export function createWebUnitInstance(data){
    return service.request({
        url: "/webUnitInstance/createWebUnitInstance",
        method: "post",
        data
    })
}

export function updateWebUnitInstance(data){
    return service.request({
        url: "/webUnitInstance/updateWebUnitInstance",
        method: "post",
        data
    })
}

export function findWebUnitInstance(data){
    return service.request({
        url: "/webUnitInstance/findWebUnitInstance",
        method: "post",
        data
    })
}

export function findWebUnitInstanceList(data){
    return service.request({
        url: "/webUnitInstance/findWebUnitInstanceList",
        method: "post",
        data
    })
}

export function findWebUnitInstancePage(data){
    return service.request({
        url: "/webUnitInstance/findWebUnitInstancePage",
        method: "post",
        data
    })
}
