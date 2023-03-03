import {Axios} from "tiklab-core-ui";

export function createFormParam(data){
    return Axios.post("/formParam/createFormParam",data)
}

export function deleteFormParam(data){
    return Axios.post("/formParam/deleteFormParam",data)
}

export function updateFormParam(data){
    return Axios.post("/formParam/updateFormParam",data)
}

export function findFormParam(data){
    return Axios.post("/formParam/findFormParam",data)
}

export function findFormParamList(data){
    return Axios.post("/formParam/findFormParamList",data)
}

