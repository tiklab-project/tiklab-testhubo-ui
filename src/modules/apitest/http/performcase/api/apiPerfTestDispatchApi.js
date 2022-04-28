import {Axios as service} from "doublekit-core-ui";

export function apiPerfExecute(data){
    return service.request({
        url: "/apiPerfTestDispatch/execute",
        method: "post",
        data
    })
}

