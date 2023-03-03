/*
 * @Description: 空间接口
 * @Author: sunxiancheng
 * @LastEditTime: 2022-06-16 20:28:21
 */

import { Axios } from "tiklab-core-ui";

export function findRepositoryRecentList(data){
    return Axios.post("/repositoryRecent/findRepositoryRecentList",data)
}

export function repositoryRecent(data){
    return Axios.post("/repositoryRecent/repositoryRecent",data)
}


