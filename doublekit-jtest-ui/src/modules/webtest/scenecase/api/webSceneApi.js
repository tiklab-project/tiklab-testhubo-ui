// import {Axios as service} from "doublekit-core-ui";


import service from "../../../../common/utils/localrequest";
import "../../../../mock/webSceneMock"

export function findWebScenePage(data){
    return service.request({
        url: "/webScene/findWebScenePage",
        method: "post",
        data
    })
}

export function findWebScene(data){
    return service.request({
        url: "/webScene/findWebScene",
        method: "post",
        data
    })
}

export function createWebScene(data){
    return service.request({
        url: "/webScene/createWebScene",
        method: "post",
        data
    })
}

export function deleteWebScene(data){
    return service.request({
        url: "/webScene/deleteWebScene",
        method: "post",
        data
    })
}

export function updateWebScene(data){
    return service.request({
        url: "/webScene/updateWebScene",
        method: "post",
        data
    })
}
