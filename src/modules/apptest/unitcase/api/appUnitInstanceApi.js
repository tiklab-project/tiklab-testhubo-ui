// import {Axios as service} from "doublekit-core-ui";

import service from "../../../../common/utils/localrequest";
import "../../../../mock/appUnitInstanceMock"

export function deleteAppUnitInstance(data){
    return service.request({
        url: "/appUnitInstance/deleteAppUnitInstance",
        method: "post",
        data
    })
}

export function createAppUnitInstance(data){
    return service.request({
        url: "/appUnitInstance/createAppUnitInstance",
        method: "post",
        data
    })
}

export function updateAppUnitInstance(data){
    return service.request({
        url: "/appUnitInstance/updateAppUnitInstance",
        method: "post",
        data
    })
}

export function findAppUnitInstance(data){
    return service.request({
        url: "/appUnitInstance/findAppUnitInstance",
        method: "post",
        data
    })
}

export function findAppUnitInstanceList(data){
    return service.request({
        url: "/appUnitInstance/findAppUnitInstanceList",
        method: "post",
        data
    })
}

export function findAppUnitInstancePage(data){
    return service.request({
        url: "/appUnitInstance/findAppUnitInstancePage",
        method: "post",
        data
    })
}
