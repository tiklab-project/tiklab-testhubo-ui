// import {Axios as service} from "doublekit-core-ui";
import service from "../../../../common/utils/localrequest";
import "../../../../mock/webPerformSceneMock"

export function deleteWebPerformScene(data){
    return service.request({
        url: "/webPerformScene/deleteWebPerformScene",
        method: "post",
        data
    })
}

export function createWebPerformScene(data){
    return service.request({
        url: "/webPerformScene/createWebPerformScene",
        method: "post",
        data
    })
}

export function findWebPerformScene(data){
    return service.request({
        url: "/webPerformScene/findWebPerformScene",
        method: "post",
        data
    })
}

export function updateWebPerformScene(data){
    return service.request({
        url: "/webPerformScene/updateWebPerformScene",
        method: "post",
        data
    })
}

export function findWebPerformScenePage(data){
    return service.request({
        url: "/webPerformScene/findWebPerformScenePage",
        method: "post",
        data
    })
}

export function findWebPerformSceneList(data){
    return service.request({
        url: "/webPerformScene/findWebPerformSceneList",
        method: "post",
        data
    })
}
