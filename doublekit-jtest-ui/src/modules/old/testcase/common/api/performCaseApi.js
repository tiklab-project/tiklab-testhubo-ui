/**
 * @description：
 * @date: 2021-08-13 10:50
 */
import {Axios as service} from "doublekit-core-ui";

//api执行测试
export function performCase(data){
    return service.request({
        url: "/performCase/performCase",
        method: "post",
        data
    })
}

// webUI执行测试
export function performCaseWeb(data){
    return service.request({
        url: "/performCase/performCaseWeb",
        method: "post",
        data
    })
}

// 查找webUI结果
export function findCaseWebResult(data){
    return service.request({
        url: "/performCase/findCaseWebResult",
        method: "post",
        data
    })
}

//app执行测试
export function performCaseApp(data){
    return service.request({
        url: "/performCase/performCaseApp",
        method: "post",
        data
    })
}

//查找app结果
export function findCaseAppResult(data){
    return service.request({
        url: "/performCase/findCaseAppResult",
        method: "post",
        data
    })
}
