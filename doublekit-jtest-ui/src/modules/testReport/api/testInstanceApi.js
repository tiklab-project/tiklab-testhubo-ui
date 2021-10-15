/**
 * @description：
 * @date: 2021-08-13 10:15
 */
import {Axios as service} from "doublekit-core-ui";

//用例步骤id和用例测试结果的id 查询用例步骤的测试详情
export function findApiInstanceDetail(data){
    return service.request({
        url: "/testInstance/findApiInstanceDetail",
        method: "post",
        data
    })
}

export function findTestInstancePage(data){
    return service.request({
        url: "/testInstance/findTestInstancePage",
        method: "post",
        data
    })
}

export function createTestInstance(data){
    return service.request({
        url: "/testInstance/createTestInstance",
        method: "post",
        data
    })
}

export function deleteTestInstance(data){
    return service.request({
        url: "/testInstance/deleteTestInstance",
        method: "post",
        data
    })
}

export function updateTestInstance(data){
    return service.request({
        url: "/testInstance/updateTestInstance",
        method: "post",
        data
    })
}

//分页查询当前用例库的用例测试结果(历史测试记录)
export function findInstanceByReposterId(data){
    return service.request({
        url: "/testInstance/findInstanceByReposterId",
        method: "post",
        data
    })
}

//通过API测试结果的id查询测试结果汇总
export function findApiInstanceCollentById(data){
    return service.request({
        url: "/testInstance/findApiInstanceCollentById",
        method: "post",
        data
    })
}

//查询单个用例的所有测试结果（单个用例的历史测试记录 APP WEB API 公用）
export function findInstancesByTestCaseId(data){
    return service.request({
        url: "/testInstance/findInstancesByTestCaseId",
        method: "post",
        data
    })
}

//通过API用例测试结果Id查询用例步骤的测试结果
export function findApiInstanceById(data){
    return service.request({
        url: "/testInstance/findApiInstanceById",
        method: "post",
        data
    })
}

//通过web用例测试结果Id查询结果汇总和步骤详情
export function findWebInstanceById(data){
    return service.request({
        url: "testInstance/findWebInstanceById",
        method: "post",
        data
    })
}

export function findResultByInstanceId(data){
    return service.request({
        url: "testInstance/findResultByInstanceId",
        method: "post",
        data
    })
}

export function findApiResultByInstanceId(data){
    return service.request({
        url: "testInstance/findApiResultByInstanceId",
        method: "post",
        data
    })
}


