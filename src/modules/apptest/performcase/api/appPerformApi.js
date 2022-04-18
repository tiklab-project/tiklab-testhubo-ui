// import {Axios as service} from "doublekit-core-ui";

import service from "../../../../common/utils/localrequest";
import "../../../../mock/appPerformMock"

export function findAppPerformPage(data){
    return service.request({
        url: "/appPerform/findAppPerformPage",
        method: "post",
        data
    })
}

export function findAppPerform(data){
    return service.request({
        url: "/appPerform/findAppPerform",
        method: "post",
        data
    })
}

export function createAppPerform(data){
    return service.request({
        url: "/appPerform/createAppPerform",
        method: "post",
        data
    })
}

export function deleteAppPerform(data){
    return service.request({
        url: "/appPerform/deleteAppPerform",
        method: "post",
        data
    })
}

export function updateAppPerform(data){
    return service.request({
        url: "/appPerform/updateAppPerform",
        method: "post",
        data
    })
}
