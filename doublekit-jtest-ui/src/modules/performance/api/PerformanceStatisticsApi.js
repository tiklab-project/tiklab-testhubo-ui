/**
 * @description：性能历史报告api
 * @date: 2021-08-24 15:19
 */
import {Axios as service} from "doublekit-core-ui";

export function findPerformanceStatisticsPage(data){
    return service.request({
        url: "/performanceStatistics/findPerformanceStatisticsPage",
        method: "post",
        data
    })
}

export function findPerformanceStatistics(data){
    return service.request({
        url: "/performanceStatistics/findPerformanceStatistics",
        method: "post",
        data
    })
}

export function createPerformanceStatistics(data){
    return service.request({
        url: "/performanceStatistics/createPerformanceStatistics",
        method: "post",
        data
    })
}

export function deletePerformanceStatistics(data){
    return service.request({
        url: "/performanceStatistics/deletePerformanceStatistics",
        method: "post",
        data
    })
}

export function updatePerformanceStatistics(data){
    return service.request({
        url: "/performanceStatistics/updatePerformanceStatistics",
        method: "post",
        data
    })
}

export function findPerformanceStatisticsList(data){
    return service.request({
        url: "/performanceStatistics/findPerformanceStatisticsList",
        method: "post",
        data
    })
}

