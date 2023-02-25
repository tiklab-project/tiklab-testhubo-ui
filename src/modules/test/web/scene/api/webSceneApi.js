import {Axios as service} from "tiklab-core-ui";


export function findWebScenePage(data){
    return service.request({
        url: "/webSceneCase/findWebSceneCasePage",
        method: "post",
        data
    })
}


export function findWebSceneList(data){
    return service.request({
        url: "/webSceneCase/findWebSceneCaseList",
        method: "post",
        data
    })
}

export function findWebScene(data){
    return service.request({
        url: "/webSceneCase/findWebSceneCase",
        method: "post",
        data
    })
}

export function createWebScene(data){
    return service.request({
        url: "/webSceneCase/createWebSceneCase",
        method: "post",
        data
    })
}

export function deleteWebScene(data){
    return service.request({
        url: "/webSceneCase/deleteWebSceneCase",
        method: "post",
        data
    })
}

export function updateWebScene(data){
    return service.request({
        url: "/webSceneCase/updateWebSceneCase",
        method: "post",
        data
    })
}


export function findWebSceneCaseListByTestCase(data){
    return service.request({
        url: "/webSceneCase/findWebSceneCaseListByTestCase",
        method: "post",
        data
    })
}

//web测试
export function webSceneTestDispatch(data){
    return service.request({
        url: "/webSceneTestDispatch/execute",
        method: "post",
        data
    })
}
