import {Axios as service} from "tiklab-core-ui";

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