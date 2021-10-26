/**
 * @description：
 * @date: 2021-08-24 16:01
 */
import React, {useEffect} from 'react';
import {inject, observer} from "mobx-react";
import {Table} from "antd";

const PerformanceTestResult = (props) => {
    const {performanceStore,testCaseId} = props;
    const {taskResult,executeType,testResultList} = performanceStore;
    //列表头
    const columns = [
        {
            title:`总耗时`,
            dataIndex: "allResponseTime",
            key: "allResponseTime",
            align:"center",
        },
        {
            title: `平均响应时间`,
            dataIndex: "averageResponseTime",
            key: "averageResponseTime",
            align:"center",
        },
        {
            title: `中位数`,
            dataIndex: "middleResponseTime",
            key: "middleResponseTime",
            align:"center",
        },
        {
            title: `最小响应时间`,
            dataIndex: 'minimumResponseTime',
            key: "minimumResponseTime",
            align:"center",
        },
        {
            title: `最大响应时间`,
            dataIndex: "maxuimumResponseTime",
            key: "maxuimumResponseTime",
            align:"center",
        },
        {
            title: `错误率`,
            dataIndex: "errorRate",
            key: "errorRate",
            align:"center",
        },
    ]

    useEffect(() => {
        let timer
        if(executeType==='start'||executeType==='continue'){
              timer = setInterval(()=>{
                  taskResult(testCaseId)
            },2000)
        }
        return () => {
            //清除定时器
            clearInterval(timer)
        }
    },[executeType])

    return(
        <Table
            className="tablelist"
            columns={columns}
            dataSource={testResultList}
            rowKey={record => record.id}
            pagination={false}
        />
    )
}

export default inject('performanceStore')(observer(PerformanceTestResult));
