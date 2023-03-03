import {Axios as service} from "tiklab-core-ui";

export function deleteAgentConfig(data){
    return service.request({
        url: "/agentConfig/deleteAgentConfig",
        method: "post",
        data 
    })
}

export function createAgentConfig(data){
    return service.request({
        url: "/agentConfig/createAgentConfig",
        method: "post",
        data 
    })
}

export function findAgentConfig(data){
    return service.request({
        url: "/agentConfig/findAgentConfig",
        method: "post",
        data 
    })
}

export function updateAgentConfig(data){
    return service.request({
        url: "/agentConfig/updateAgentConfig",
        method: "post",
        data 
    })
}

export function findAgentConfigPage(data){
    return service.request({
        url: "/agentConfig/findAgentConfigPage",
        method: "post",
        data 
    })
}

export function findAgentConfigList(data){
    return service.request({
        url: "/agentConfig/findAgentConfigList",
        method: "post",
        data 
    })
}
