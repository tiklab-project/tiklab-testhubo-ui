// import {Axios as service} from "doublekit-core-ui";

import service from "../../../../common/utils/localrequest";
import "../../../../mock/apiPerformMock"

export function deleteApiPerform(data){
    return service.request({
        url: "/apiPerform/deleteApiPerform",
        method: "post",
        data
    })
}

export function createApiPerform(data){
    return service.request({
        url: "/apiPerform/createApiPerform",
        method: "post",
        data
    })
}

export function updateApiPerform(data){
    return service.request({
        url: "/apiPerform/updateApiPerform",
        method: "post",
        data
    })
}

export function findApiPerform(data){
    return service.request({
        url: "/apiPerform/findApiPerform",
        method: "post",
        data
    })
}

export function findApiPerformList(data){
    return service.request({
        url: "/apiPerform/findApiPerformList",
        method: "post",
        data
    })
}

export function findApiPerformPage(data){
    return service.request({
        url: "/apiPerform/findApiPerformPage",
        method: "post",
        data
    })
}
