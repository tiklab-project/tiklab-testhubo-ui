/**
 * @description：
 * @date: 2021-08-20 16:00
 */

import {Axios as service} from "doublekit-core-ui";

export function findQuartzTestcasePage(data){
    return service.request({
        url: "/quartzTestcase/findQuartzTestcasePage",
        method: "post",
        data
    })
}

export function findQuartzTestcaseList(data){
    return service.request({
        url: "/quartzTestcase/findQuartzTestcaseList",
        method: "post",
        data
    })
}

//弹框中的测试用例查询
export function findRepositoryTestcaseList(data){
    return service.request({
        url: "/quartzTestcase/findRepositoryTestcaseList",
        method: "post",
        data
    })
}

export function findQuartzTestcase(data){
    return service.request({
        url: "/quartzTestcase/findQuartzTestcase",
        method: "post",
        data
    })
}

export function createQuartzTestcase(data){
    return service.request({
        url: "/quartzTestcase/createQuartzTestcase",
        method: "post",
        data
    })
}

export function deleteQuartzTestcase(data){
    return service.request({
        url: "/quartzTestcase/deleteQuartzTestcase",
        method: "post",
        data
    })
}

export function updateQuartzTestcase(data){
    return service.request({
        url: "/quartzTestcase/updateQuartzTestcase",
        method: "post",
        data
    })
}
