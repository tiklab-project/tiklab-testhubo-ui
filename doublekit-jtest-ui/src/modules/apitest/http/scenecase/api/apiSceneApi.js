import {Axios as service} from "doublekit-core-ui";

export function deleteApiScene(data){
    return service.request({
        url: "/apiSceneCase/deleteApiSceneCase",
        method: "post",
        data
    })
}

export function createApiScene(data){
    return service.request({
        url: "/apiSceneCase/createApiSceneCase",
        method: "post",
        data
    })
}

export function updateApiScene(data){
    return service.request({
        url: "/apiSceneCase/updateApiSceneCase",
        method: "post",
        data
    })
}

export function findApiScene(data){
    return service.request({
        url: "/apiSceneCase/findApiSceneCase",
        method: "post",
        data
    })
}

export function findApiSceneList(data){
    return service.request({
        url: "/apiSceneCase/findApiSceneCaseList",
        method: "post",
        data
    })
}

export function findApiScenePage(data){
    return service.request({
        url: "/apiSceneCase/findApiSceneCasePage",
        method: "post",
        data
    })
}

export function findApiSceneCaseListByTestCase(data){
    return service.request({
        url: "/apiSceneCase/findApiSceneCaseListByTestCase",
        method: "post",
        data
    })
}
