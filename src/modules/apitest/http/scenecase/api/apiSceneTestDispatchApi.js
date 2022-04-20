import {Axios as service} from "doublekit-core-ui";

export function apiSceneExecute(data){
    return service.request({
        url: "/apiSceneTestDispatch/execute",
        method: "post",
        data
    })
}

