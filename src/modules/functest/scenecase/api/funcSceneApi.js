import {Axios as service} from "tiklab-core-ui";


export function findFuncScenePage(data){
    return service.request({
        url: "/funcSceneCase/findFuncSceneCasePage",
        method: "post",
        data
    })
}


export function findFuncSceneList(data){
    return service.request({
        url: "/funcSceneCase/findFuncSceneCaseList",
        method: "post",
        data
    })
}

export function findFuncScene(data){
    return service.request({
        url: "/funcSceneCase/findFuncSceneCase",
        method: "post",
        data
    })
}

export function createFuncScene(data){
    return service.request({
        url: "/funcSceneCase/createFuncSceneCase",
        method: "post",
        data
    })
}

export function deleteFuncScene(data){
    return service.request({
        url: "/funcSceneCase/deleteFuncSceneCase",
        method: "post",
        data
    })
}

export function updateFuncScene(data){
    return service.request({
        url: "/funcSceneCase/updateFuncSceneCase",
        method: "post",
        data
    })
}


export function findFuncSceneCaseListByTestCase(data){
    return service.request({
        url: "/funcSceneCase/findFuncSceneCaseListByTestCase",
        method: "post",
        data
    })
}