import {Axios as service} from "tiklab-core-ui";

export function findRepositoryPage(data){
    return service.request({
        url: "/repository/findRepositoryPage",
        method: "post",
        data
    })
}

export function findRepositoryList(data){
    return service.request({
        url: "/repository/findRepositoryList",
        method: "post",
        data
    })
}


export function findRepository(data){
    return service.request({
        url: "/repository/findRepository",
        method: "post",
        data
    })
}

export function createRepository(data){
    return service.request({
        url: "/repository/createRepository",
        method: "post",
        data
    })
}

export function deleteRepository(data){
    return service.request({
        url: "/repository/deleteRepository",
        method: "post",
        data
    })
}

export function updateRepository(data){
    return service.request({
        url: "/repository/updateRepository",
        method: "post",
        data
    })
}

export function findRepositoryHomeTotal(data){
    return service.request({
        url: "/repository/findRepositoryHomeTotal",
        method: "post",
        data
    })
}


