// import {Axios as service} from "doublekit-core-ui";

import service from "../../../../common/utils/localrequest";
import "../../../../mock/webPerformMock"

export function findWebPerformPage(data){
    return service.request({
        url: "/webPerform/findWebPerformPage",
        method: "post",
        data
    })
}

export function findWebPerform(data){
    return service.request({
        url: "/webPerform/findWebPerform",
        method: "post",
        data
    })
}

export function createWebPerform(data){
    return service.request({
        url: "/webPerform/createWebPerform",
        method: "post",
        data
    })
}

export function deleteWebPerform(data){
    return service.request({
        url: "/webPerform/deleteWebPerform",
        method: "post",
        data
    })
}

export function updateWebPerform(data){
    return service.request({
        url: "/webPerform/updateWebPerform",
        method: "post",
        data
    })
}
