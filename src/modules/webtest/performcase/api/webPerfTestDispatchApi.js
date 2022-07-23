import {Axios as service} from "doublekit-core-ui";

export function webPerfExecute(data){
    return service.request({
        url: "/webPerfTestDispatch/execute",
        method: "post",
        data
    })
}


export function exeResult(data){
    return service.request({
        url: "/webPerfTestDispatch/exeResult",
        method: "post",
        data
    })
}