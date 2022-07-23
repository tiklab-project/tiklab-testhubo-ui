import {Axios as service} from "doublekit-core-ui";

export function appPerfExecute(data){
    return service.request({
        url: "/appPerfTestDispatch/execute",
        method: "post",
        data
    })
}


export function exeResult(data){
    return service.request({
        url: "/appPerfTestDispatch/exeResult",
        method: "post",
        data
    })
}