// import {Axios as service} from "doublekit-core-ui";

import service from "../../../../common/utils/localrequest";
import "../../../../mock/apiSceneInstanceMock"

export function deleteApiSceneInstance(data){
    return service.request({
        url: "/apiSceneInstance/deleteApiSceneInstance",
        method: "post",
        data
    })
}

export function createApiSceneInstance(data){
    return service.request({
        url: "/apiSceneInstance/createApiSceneInstance",
        method: "post",
        data
    })
}

export function updateApiSceneInstance(data){
    return service.request({
        url: "/apiSceneInstance/updateApiSceneInstance",
        method: "post",
        data
    })
}

export function findApiSceneInstance(data){
    return service.request({
        url: "/apiSceneInstance/findApiSceneInstance",
        method: "post",
        data
    })
}

export function findApiSceneInstanceList(data){
    return service.request({
        url: "/apiSceneInstance/findApiSceneInstanceList",
        method: "post",
        data
    })
}

export function findApiSceneInstancePage(data){
    return service.request({
        url: "/apiSceneInstance/findApiSceneInstancePage",
        method: "post",
        data
    })
}
