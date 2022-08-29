/*
 * @Description: 空间接口
 * @Author: sunxiancheng
 * @LastEditTime: 2022-06-16 20:28:21
 */

import { Axios } from "tiklab-core-ui";

export function deleteRepositoryRecent(data){
    return Axios.post("/repositoryRecent/deleteRepositoryRecent",data)
}

export function createRepositoryRecent(data){
    return Axios.post("/repositoryRecent/createRepositoryRecent",data)
}

export function findRepositoryRecent(data){
    return Axios.post("/repositoryRecent/findRepositoryRecent",data)
}

export function updateRepositoryRecent(data){
    return Axios.post("/repositoryRecent/updateRepositoryRecent",data)
}

export function findRepositoryRecentPage(data){
    return Axios.post("/repositoryRecent/findRepositoryRecentPage",data)
}

export function findRepositoryRecentList(data){
    return Axios.post("/repositoryRecent/findRepositoryRecentList",data)
}

export function repositoryRecent(data){
    return Axios.post("/repositoryRecent/repositoryRecent",data)
}


