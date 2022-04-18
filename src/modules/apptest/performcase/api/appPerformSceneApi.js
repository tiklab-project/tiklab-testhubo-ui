// import {Axios as service} from "doublekit-core-ui";
import service from "../../../../common/utils/localrequest";
import "../../../../mock/appPerformSceneMock"

export function deleteAppPerformScene(data){
    return service.request({
        url: "/appPerformScene/deleteAppPerformScene",
        method: "post",
        data
    })
}

export function createAppPerformScene(data){
    return service.request({
        url: "/appPerformScene/createAppPerformScene",
        method: "post",
        data
    })
}

export function findAppPerformScene(data){
    return service.request({
        url: "/appPerformScene/findAppPerformScene",
        method: "post",
        data
    })
}

export function updateAppPerformScene(data){
    return service.request({
        url: "/appPerformScene/updateAppPerformScene",
        method: "post",
        data
    })
}

export function findAppPerformScenePage(data){
    return service.request({
        url: "/appPerformScene/findAppPerformScenePage",
        method: "post",
        data
    })
}

export function findAppPerformSceneList(data){
    return service.request({
        url: "/appPerformScene/findAppPerformSceneList",
        method: "post",
        data
    })
}
