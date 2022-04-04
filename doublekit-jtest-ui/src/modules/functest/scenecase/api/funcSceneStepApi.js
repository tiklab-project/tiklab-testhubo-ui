// import {Axios as service} from "doublekit-core-ui";
import service from "../../../../common/utils/localrequest";
import "../../../../mock/funcSceneStepMock"

export function deleteFuncSceneStep(data){
    return service.request({
        url: "/funcSceneStep/deleteFuncSceneStep",
        method: "post",
        data
    })
}

export function createFuncSceneStep(data){
    return service.request({
        url: "/funcSceneStep/createFuncSceneStep",
        method: "post",
        data
    })
}

export function findFuncSceneStep(data){
    return service.request({
        url: "/funcSceneStep/findFuncSceneStep",
        method: "post",
        data
    })
}

export function updateFuncSceneStep(data){
    return service.request({
        url: "/funcSceneStep/updateFuncSceneStep",
        method: "post",
        data
    })
}

export function findFuncSceneStepPage(data){
    return service.request({
        url: "/funcSceneStep/findFuncSceneStepPage",
        method: "post",
        data
    })
}

export function findFuncSceneStepList(data){
    return service.request({
        url: "/funcSceneStep/findFuncSceneStepList",
        method: "post",
        data
    })
}
