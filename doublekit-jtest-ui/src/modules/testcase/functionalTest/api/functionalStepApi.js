import {Axios as service} from "doublekit-core-ui";


export function deleteFunctionalStep(data){
    return service.request({
        url: "/functionalStep/deleteFunctionalStep",
        method: "post",
        data
    })
}

export function createFunctionalStep(data){
    return service.request({
        url: "/functionalStep/createFunctionalStep",
        method: "post",
        data
    })
}

export function findFunctionalStep(data){
    return service.request({
        url: "/functionalStep/findFunctionalStep",
        method: "post",
        data
    })
}

export function updateFunctionalStep(data){
    return service.request({
        url: "/functionalStep/updateFunctionalStep",
        method: "post",
        data
    })
}

export function findFunctionalStepPage(data){
    return service.request({
        url: "/functionalStep/findFunctionalStepPage",
        method: "post",
        data
    })
}

export function findFunctionalStepList(data){
    return service.request({
        url: "/functionalStep/findFunctionalStepList",
        method: "post",
        data
    })
}
