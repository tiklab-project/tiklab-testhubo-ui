
/*
 * @Description: 空间接口
 * @Author: sunxiancheng
 * @LastEditTime: 2022-06-17 20:28:21
 */
import { Axios } from "tiklab-core-ui";

export function deleteRepositoryFollow(data){
    return Axios.post("/repositoryFollow/deleteRepositoryFollow",data)
}

export function createRepositoryFollow(data){
    return Axios.post("/repositoryFollow/createRepositoryFollow",data)
}

export function findRepositoryFollow(data){
    return Axios.post("/repositoryFollow/findRepositoryFollow",data)
}

export function updateRepositoryFollow(data){
    return Axios.post("/repositoryFollow/updateRepositoryFollow",data)
}

export function findAllRepositoryFollow(data){
    return Axios.post("/repositoryFollow/findAllRepositoryFollow",data)
}

export function findRepositoryFollowPage(data){
    return Axios.post("/repositoryFollow/findRepositoryFollowPage",data)
}

export function findRepositoryFollowList(data){
    return Axios.post("/repositoryFollow/findRepositoryFollowList",data)
}

