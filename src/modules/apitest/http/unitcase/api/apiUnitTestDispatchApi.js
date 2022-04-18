import {Axios as service} from "doublekit-core-ui";

export function apiUnitExecute(data){
    return service.request({
        url: "/apiUnitTestDispatch/execute",
        method: "post",
        data
    })
}

