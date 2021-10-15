/**
 * @description：性能测试api
 * @date: 2021-08-24 15:19
 */
import {Axios as service} from "doublekit-core-ui";

export function findPerformancePage(data){
    return service.request({
        url: "/performanceTest/findPerformanceTestPage",
        method: "post",
        data
    })
}

export function findPerformance(data){
    return service.request({
        url: "/performanceTest/findPerformanceTest",
        method: "post",
        data
    })
}

export function createPerformance(data){
    return service.request({
        url: "/performanceTest/createPerformanceTest",
        method: "post",
        data
    })
}

export function deletePerformance(data){
    return service.request({
        url: "/performanceTest/deletePerformanceTest",
        method: "post",
        data
    })
}

export function updatePerformance(data){
    return service.request({
        url: "/performanceTest/updatePerformanceTest",
        method: "post",
        data
    })
}

//关联用例查询
export function findTestCaseAll(data){
    return service.request({
        url: "/performanceTest/findTestCaseAll",
        method: "post",
        data
    })
}

//执行性能测试
export function executeTest(data){
    return service.request({
        url: "/performanceTest/executeTest",
        method: "post",
        data
    })
}

//测试结果
export function taskResult(data){
    return service.request({
        url: "/performanceTest/taskResult",
        method: "post",
        data
    })
}

//停止或暂停性能测试
export function endOrPauseTest(data){
    return service.request({
        url: "/performanceTest/endOrPauseTest",
        method: "post",
        data
    })
}
