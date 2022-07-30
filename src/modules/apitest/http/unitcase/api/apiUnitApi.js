import {Axios as service} from "tiklab-core-ui";

export function findApiUnitPage(data){
    return service.request({
        url: "/apiUnitCase/findApiUnitCasePage",
        method: "post",
        data
    })
}

export function findApiUnitList(data){
    return service.request({
        url: "/apiUnitCase/findApiUnitCaseList",
        method: "post",
        data
    })
}


export function findApiUnitListByTestCase(data){
    return service.request({
        url: "/apiUnitCase/findApiUnitCaseListByTestCase",
        method: "post",
        data
    })
}


export function findApiUnit(data){
    return service.request({
        url: "/apiUnitCase/findApiUnitCase",
        method: "post",
        data
    })
}

export function createApiUnit(data){
    return service.request({
        url: "/apiUnitCase/createApiUnitCase",
        method: "post",
        data
    })
}

export function deleteApiUnit(data){
    return service.request({
        url: "/apiUnitCase/deleteApiUnitCase",
        method: "post",
        data
    })
}

export function updateApiUnit(data){
    return service.request({
        url: "/apiUnitCase/updateApiUnitCase",
        method: "post",
        data
    })
}
