// import {Axios as service} from "doublekit-core-ui";

import service from "../../../../../common/utils/localrequest";
import "../../../../../mock/apiSceneMock"

export function deleteApiScene(data){
    return service.request({
        url: "/apiScene/deleteApiScene",
        method: "post",
        data
    })
}

export function createApiScene(data){
    return service.request({
        url: "/apiScene/createApiScene",
        method: "post",
        data
    })
}

export function updateApiScene(data){
    return service.request({
        url: "/apiScene/updateApiScene",
        method: "post",
        data
    })
}

export function findApiScene(data){
    return service.request({
        url: "/apiScene/findApiScene",
        method: "post",
        data
    })
}

export function findApiSceneList(data){
    return service.request({
        url: "/apiScene/findApiSceneList",
        method: "post",
        data
    })
}

export function findApiScenePage(data){
    return service.request({
        url: "/apiScene/findApiScenePage",
        method: "post",
        data
    })
}
