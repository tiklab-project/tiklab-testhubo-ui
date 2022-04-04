// import {Axios as service} from "doublekit-core-ui";


import service from "../../../../common/utils/localrequest";
import "../../../../mock/appSceneMock"

export function findAppScenePage(data){
    return service.request({
        url: "/appScene/findAppScenePage",
        method: "post",
        data
    })
}

export function findAppScene(data){
    return service.request({
        url: "/appScene/findAppScene",
        method: "post",
        data
    })
}

export function createAppScene(data){
    return service.request({
        url: "/appScene/createAppScene",
        method: "post",
        data
    })
}

export function deleteAppScene(data){
    return service.request({
        url: "/appScene/deleteAppScene",
        method: "post",
        data
    })
}

export function updateAppScene(data){
    return service.request({
        url: "/appScene/updateAppScene",
        method: "post",
        data
    })
}
