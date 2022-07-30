import { Axios } from "tiklab-core-ui";

export function createAfterScript(data){
    return Axios.post("/afterScript/createAfterScript",data)
}

export function updateAfterScript(data){
    return Axios.post("/afterScript/updateAfterScript",data)
}

export function deleteAfterScript(data){
    return Axios.post("/afterScript/deleteAfterScript",data)
}

export function findAfterScript(data){
    return Axios.post("/afterScript/findAfterScript",data)
}

export function findAfterScriptList(data){
    return Axios.post("/afterScript/findAfterScriptList",data)
}

