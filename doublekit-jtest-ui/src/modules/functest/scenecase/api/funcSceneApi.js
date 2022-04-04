// import {Axios as service} from "doublekit-core-ui";

import service from "../../../../common/utils/localrequest";
import "../../../../mock/funcSceneMock"

export function deleteFuncScene(data){
    return service.request({
        url: "/funcScene/deleteFuncScene",
        method: "post",
        data
    })
}

export function createFuncScene(data){
    return service.request({
        url: "/funcScene/createFuncScene",
        method: "post",
        data
    })
}

export function updateFuncScene(data){
    return service.request({
        url: "/funcScene/updateFuncScene",
        method: "post",
        data
    })
}

export function findFuncScene(data){
    return service.request({
        url: "/funcScene/findFuncScene",
        method: "post",
        data
    })
}

export function findFuncSceneList(data){
    return service.request({
        url: "/funcScene/findFuncSceneList",
        method: "post",
        data
    })
}

export function findFuncScenePage(data){
    return service.request({
        url: "/funcScene/findFuncScenePage",
        method: "post",
        data
    })
}
