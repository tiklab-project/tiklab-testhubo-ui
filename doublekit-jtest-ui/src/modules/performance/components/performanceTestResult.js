/**
 * @description：
 * @date: 2021-08-24 16:01
 */
import React, {useEffect, useState} from 'react';
import {inject, observer} from "mobx-react";
import TableResult from "../common/tableResult";

const PerformanceTestResult = (props) => {
    const {performanceStore,testCaseId} = props;
    const {taskResult,executeType,testResultList} = performanceStore;

    // const [data,setData] =useState([])

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
        <TableResult
            dataSource={testResultList}
            pagination={false}
        />
    )
}

export default inject('performanceStore')(observer(PerformanceTestResult));
