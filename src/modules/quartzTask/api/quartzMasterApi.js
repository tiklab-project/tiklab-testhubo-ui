/**
 * @description：
 * @date: 2021-08-18 16:49
 */
import {Axios as service} from "tiklab-core-ui";

export function findQuartzMasterPage(data){
    return service.request({
        url: "/quartzMaster/findQuartzMasterPage",
        method: "post",
        data
    })
}

export function findQuartzMaster(data){
    return service.request({
        url: "/quartzMaster/findQuartzMaster",
        method: "post",
        data
    })
}

export function createQuartzMaster(data){
    return service.request({
        url: "/quartzMaster/createQuartzMaster",
        method: "post",
        data
    })
}

export function deleteQuartzMaster(data){
    return service.request({
        url: "/quartzMaster/deleteQuartzMaster",
        method: "post",
        data
    })
}

export function updateQuartzMaster(data){
    return service.request({
        url: "/quartzMaster/updateQuartzMaster",
        method: "post",
        data
    })
}
