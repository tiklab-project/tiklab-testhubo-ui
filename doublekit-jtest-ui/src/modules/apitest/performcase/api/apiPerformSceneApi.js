// import {Axios as service} from "doublekit-core-ui";

import service from "../../../../common/utils/localrequest";
import "../../../../mock/apiPerformStepMock"

export function deleteApiPerformScene(data){
    return service.request({
        url: "/apiPerformScene/deleteApiPerformScene",
        method: "post",
        data
    })
}

export function createApiPerformScene(data){
    return service.request({
        url: "/apiPerformScene/createApiPerformScene",
        method: "post",
        data
    })
}

export function updateApiPerformScene(data){
    return service.request({
        url: "/apiPerformScene/updateApiPerformScene",
        method: "post",
        data
    })
}

export function findApiPerformScene(data){
    return service.request({
        url: "/apiPerformScene/findApiPerformScene",
        method: "post",
        data
    })
}

export function findApiPerformSceneList(data){
    return service.request({
        url: "/apiPerformScene/findApiPerformSceneList",
        method: "post",
        data
    })
}

export function findApiPerformScenePage(data){
    return service.request({
        url: "/apiPerformScene/findApiPerformScenePage",
        method: "post",
        data
    })
}
