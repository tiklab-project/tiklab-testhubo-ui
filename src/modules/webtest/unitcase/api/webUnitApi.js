import {Axios as service} from "tiklab-core-ui";

export function findWebUnitCaseListByTestCase(data){
    return service.request({
        url: "/webUnitCase/findWebUnitCaseListByTestCase",
        method: "post",
        data
    })
}


export function findWebUnitPage(data){
    return service.request({
        url: "/webUnitCase/findWebUnitCasePage",
        method: "post",
        data
    })
}

export function findWebUnit(data){
    return service.request({
        url: "/webUnitCase/findWebUnitCase",
        method: "post",
        data
    })
}

export function createWebUnit(data){
    return service.request({
        url: "/webUnitCase/createWebUnitCase",
        method: "post",
        data
    })
}

export function deleteWebUnit(data){
    return service.request({
        url: "/webUnitCase/deleteWebUnitCase",
        method: "post",
        data
    })
}

export function updateWebUnit(data){
    return service.request({
        url: "/webUnitCase/updateWebUnitCase",
        method: "post",
        data
    })
}


//查询定位器
export function findAllLocation(data){
    return service.request({
        url: "/location/findAllLocation",
        method: "post",
        data
    })
}

//查询所有操作方法
export function findActionTypeList(data){
    return service.request({
        url: "/actionType/findActionTypeList",
        method: "post",
        data
    })
}



