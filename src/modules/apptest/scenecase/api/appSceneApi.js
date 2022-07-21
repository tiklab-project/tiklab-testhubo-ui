import {Axios as service} from "doublekit-core-ui";


export function findAppScenePage(data){
    return service.request({
        url: "/appSceneCase/findAppSceneCasePage",
        method: "post",
        data
    })
}


export function findAppSceneList(data){
    return service.request({
        url: "/appSceneCase/findAppSceneCaseList",
        method: "post",
        data
    })
}

export function findAppScene(data){
    return service.request({
        url: "/appSceneCase/findAppSceneCase",
        method: "post",
        data
    })
}

export function createAppScene(data){
    return service.request({
        url: "/appSceneCase/createAppSceneCase",
        method: "post",
        data
    })
}

export function deleteAppScene(data){
    return service.request({
        url: "/appSceneCase/deleteAppSceneCase",
        method: "post",
        data
    })
}

export function updateAppScene(data){
    return service.request({
        url: "/appSceneCase/updateAppSceneCase",
        method: "post",
        data
    })
}


export function findAppSceneCaseListByTestCase(data){
    return service.request({
        url: "/appSceneCase/findAppSceneCaseListByTestCase",
        method: "post",
        data
    })
}


//web测试
export function appSceneTestDispatch(data){
    return service.request({
        url: "/appSceneTestDispatch/execute",
        method: "post",
        data
    })
}
