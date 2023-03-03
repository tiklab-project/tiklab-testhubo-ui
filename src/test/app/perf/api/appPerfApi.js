import {Axios as service} from "tiklab-core-ui";


export function findAppPerfPage(data){
    return service.request({
        url: "/appPerfCase/findAppPerfCasePage",
        method: "post",
        data
    })
}

export function findAppPerf(data){
    return service.request({
        url: "/appPerfCase/findAppPerfCase",
        method: "post",
        data
    })
}

export function createAppPerf(data){
    return service.request({
        url: "/appPerfCase/createAppPerfCase",
        method: "post",
        data
    })
}

export function deleteAppPerf(data){
    return service.request({
        url: "/appPerfCase/deleteAppPerfCase",
        method: "post",
        data
    })
}

export function updateAppPerf(data){
    return service.request({
        url: "/appPerfCase/updateAppPerfCase",
        method: "post",
        data
    })
}

export function findAppPerfListByTestCase(data){
    return service.request({
        url: "/appPerfCase/findAppPerfCaseListByTestCase",
        method: "post",
        data
    })
}


