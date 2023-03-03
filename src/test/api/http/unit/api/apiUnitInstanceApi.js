import {Axios as service} from "tiklab-core-ui";

export function deleteApiUnitInstance(data){
    return service.request({
        url: "/apiUnitInstanceBind/deleteApiUnitInstanceBind",
        method: "post",
        data
    })
}

export function createApiUnitInstance(data){
    return service.request({
        url: "/apiUnitInstanceBind/createApiUnitInstanceBind",
        method: "post",
        data
    })
}

export function updateApiUnitInstance(data){
    return service.request({
        url: "/apiUnitInstanceBind/updateApiUnitInstanceBind",
        method: "post",
        data
    })
}

export function findApiUnitInstanceList(data){
    return service.request({
        url: "/apiUnitInstanceBind/findApiUnitInstanceBindList",
        method: "post",
        data
    })
}

export function findApiUnitInstancePage(data){
    return service.request({
        url: "/apiUnitInstanceBind/findApiUnitInstanceBindPage",
        method: "post",
        data
    })
}


export function findApiUnitInstance(data){
    return service.request({
        url: "/apiUnitInstance/findApiUnitInstance",
        method: "post",
        data
    })
}
