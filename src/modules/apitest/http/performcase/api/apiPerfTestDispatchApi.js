import {Axios as service} from "doublekit-core-ui";

export function apiPerfExecute(data){
    return service.request({
        url: "/apiPerfTestDispatch/execute",
        method: "post",
        data
    })
}


export function exeResult(data){
    return service.request({
        url: "/apiPerfTestDispatch/exeResult",
        method: "post",
        data
    })
}