import {Axios as service} from "tiklab-core-ui";

export function apiUnitExecute(data){
    return service.request({
        url: "/apiUnitTestDispatch/execute",
        method: "post",
        data
    })
}

