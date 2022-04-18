import {Axios as service} from "doublekit-core-ui";

export function deleteUserSelect(data){
    return service.request({
        url: "/user/deleteUser",
        method: "post",
        data
    })
}

export function createUserSelect(data){
    return service.request({
        url: "/user/createUser",
        method: "post",
        data
    })
}

export function findUserSelect(data){
    return service.request({
        url: "/user/findUser",
        method: "post",
        data
    })
}

export function updateUserSelect(data){
    return service.request({
        url: "/user/updateUser",
        method: "post",
        data
    })
}

export function findUserSelectPage(data){
    return service.request({
        url: "/user/findUserPage",
        method: "post",
        data
    })
}

export function findUserSelectList(data){
    return service.request({
        url: "/user/findUserList",
        method: "post",
        data
    })
}
