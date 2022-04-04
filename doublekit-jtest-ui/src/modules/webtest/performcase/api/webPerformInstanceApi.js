// import {Axios as service} from "doublekit-core-ui";

import service from "../../../../common/utils/localrequest";
import "../../../../mock/webPerformInstanceMock"

export function deleteWebPerformInstance(data){
    return service.request({
        url: "/webPerformInstance/deleteWebPerformInstance",
        method: "post",
        data
    })
}

export function createWebPerformInstance(data){
    return service.request({
        url: "/webPerformInstance/createWebPerformInstance",
        method: "post",
        data
    })
}

export function updateWebPerformInstance(data){
    return service.request({
        url: "/webPerformInstance/updateWebPerformInstance",
        method: "post",
        data
    })
}

export function findWebPerformInstance(data){
    return service.request({
        url: "/webPerformInstance/findWebPerformInstance",
        method: "post",
        data
    })
}

export function findWebPerformInstanceList(data){
    return service.request({
        url: "/webPerformInstance/findWebPerformInstanceList",
        method: "post",
        data
    })
}

export function findWebPerformInstancePage(data){
    return service.request({
        url: "/webPerformInstance/findWebPerformInstancePage",
        method: "post",
        data
    })
}
