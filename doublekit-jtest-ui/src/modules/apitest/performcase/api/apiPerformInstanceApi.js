// import {Axios as service} from "doublekit-core-ui";

import service from "../../../../common/utils/localrequest";
import "../../../../mock/apiPerformInstanceMock"

export function deleteApiPerformInstance(data){
    return service.request({
        url: "/apiPerformInstance/deleteApiPerformInstance",
        method: "post",
        data
    })
}

export function createApiPerformInstance(data){
    return service.request({
        url: "/apiPerformInstance/createApiPerformInstance",
        method: "post",
        data
    })
}

export function updateApiPerformInstance(data){
    return service.request({
        url: "/apiPerformInstance/updateApiPerformInstance",
        method: "post",
        data
    })
}

export function findApiPerformInstance(data){
    return service.request({
        url: "/apiPerformInstance/findApiPerformInstance",
        method: "post",
        data
    })
}

export function findApiPerformInstanceList(data){
    return service.request({
        url: "/apiPerformInstance/findApiPerformInstanceList",
        method: "post",
        data
    })
}

export function findApiPerformInstancePage(data){
    return service.request({
        url: "/apiPerformInstance/findApiPerformInstancePage",
        method: "post",
        data
    })
}
