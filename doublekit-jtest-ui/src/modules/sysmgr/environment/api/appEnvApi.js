// import {Axios as service} from "doublekit-core-ui";

import service from "../../../../common/utils/localrequest";
import "../../../../mock/appEnvMock"

export function deleteAppEnv(data){
    return service.request({
        url: "/appEnv/deleteAppEnv",
        method: "post",
        data 
    })
}

export function createAppEnv(data){
    return service.request({
        url: "/appEnv/createAppEnv",
        method: "post",
        data 
    })
}

export function findAppEnv(data){
    return service.request({
        url: "/appEnv/findAppEnv",
        method: "post",
        data 
    })
}

export function updateAppEnv(data){
    return service.request({
        url: "/appEnv/updateAppEnv",
        method: "post",
        data 
    })
}

export function findAppEnvPage(data){
    return service.request({
        url: "/appEnv/findAppEnvPage",
        method: "post",
        data 
    })
}

export function findAppEnvList(data){
    return service.request({
        url: "/appEnv/findAppEnvList",
        method: "post",
        data 
    })
}
