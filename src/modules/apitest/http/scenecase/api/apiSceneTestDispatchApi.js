import {Axios as service} from "tiklab-core-ui";

export function apiSceneExecute(data){
    return service.request({
        url: "/apiSceneTestDispatch/execute",
        method: "post",
        data
    })
}

