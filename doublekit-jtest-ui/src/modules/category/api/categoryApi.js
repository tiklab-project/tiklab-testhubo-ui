import {Axios as service} from "doublekit-core-ui";

export function createCategory(data){
    return service.request({
        url: "/category/createCategory",
        method: "post",
        data
    })
}

export function updateCategory(data){
    return service.request({
        url: "/category/updateCategory",
        method: "post",
        data
    })
}

export function deleteCategory(data){
    return service.request({
        url: "/category/deleteCategory",
        method: "post",
        data
    })
}

export function findCategoryList(data){
    return service.request({
        url: "/category/findCategoryList",
        method: "post",
        data
    })
}


export function findCategory(data){
    return service.request({
        url: "/category/findCategory",
        method: "post",
        data
    })
}

export function findCategoryListTree(data){
    return service.request({
        url: "/category/findCategoryListTree",
        method: "post",
        data
    })
}
