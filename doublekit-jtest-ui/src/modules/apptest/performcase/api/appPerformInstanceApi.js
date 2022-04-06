// import {Axios as service} from "doublekit-core-ui";

import service from "../../../../common/utils/localrequest";
import "../../../../mock/appPerformInstanceMock"

export function deleteAppPerformInstance(data){
    return service.request({
        url: "/appPerformInstance/deleteAppPerformInstance",
        method: "post",
        data
    })
}

export function createAppPerformInstance(data){
    return service.request({
        url: "/appPerformInstance/createAppPerformInstance",
        method: "post",
        data
    })
}

export function updateAppPerformInstance(data){
    return service.request({
        url: "/appPerformInstance/updateAppPerformInstance",
        method: "post",
        data
    })
}

export function findAppPerformInstance(data){
    return service.request({
        url: "/appPerformInstance/findAppPerformInstance",
        method: "post",
        data
    })
}

export function findAppPerformInstanceList(data){
    return service.request({
        url: "/appPerformInstance/findAppPerformInstanceList",
        method: "post",
        data
    })
}

export function findAppPerformInstancePage(data){
    return service.request({
        url: "/appPerformInstance/findAppPerformInstancePage",
        method: "post",
        data
    })
}
