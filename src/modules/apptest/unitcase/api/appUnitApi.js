import {Axios as service} from "doublekit-core-ui";



export function findAppUnitCaseListByTestCase(data){
    return service.request({
        url: "/appUnitCase/findAppUnitCaseListByTestCase",
        method: "post",
        data
    })
}


export function findAppUnitPage(data){
    return service.request({
        url: "/appUnitCase/findAppUnitCasePage",
        method: "post",
        data
    })
}

export function findAppUnit(data){
    return service.request({
        url: "/appUnitCase/findAppUnitCase",
        method: "post",
        data
    })
}

export function createAppUnit(data){
    return service.request({
        url: "/appUnitCase/createAppUnitCase",
        method: "post",
        data
    })
}

export function deleteAppUnit(data){
    return service.request({
        url: "/appUnitCase/deleteAppUnitCase",
        method: "post",
        data
    })
}

export function updateAppUnit(data){
    return service.request({
        url: "/appUnitCase/updateAppUnitCase",
        method: "post",
        data
    })
}
