/**
 * @description：
 * @date: 2021-08-26 10:31
 */
import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import ReportTable from "../common/reportTable";

const HandReport = (props) => {

    const {testInstanceStore,tab} = props;

    const {
        findReposter,
        testReportList,
        totalRecord,
        deleteTestReport
    } = testInstanceStore;

    const [pageSize] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [params, setParams] = useState({
        pageParam: {
            pageSize: pageSize,
            currentPage: currentPage
        }
    })
    const [tableLoading,setTableLoading] = useState(true)
    const repositoryId = localStorage.getItem('repositoryId');

    useEffect(()=> {
        if(tab==='hand'){
            params.type='hand'
            findReposter(repositoryId,params).then((res)=>{
                setTableLoading(false)
            });
        }
    },[repositoryId,params,tab])


    //分页
    const onTableChange = (pagination) => {
        setCurrentPage(pagination.current)
        const newParams = {
            ...params,
            pageParam: {
                pageSize: pageSize,
                currentPage: pagination.current
            },
        }
        setParams(newParams)
    }

    return(
        <ReportTable
            dataSource={testReportList}
            pagination={{
                current:currentPage,
                pageSize:pageSize,
                total:totalRecord,
            }}
            onTableChange = {onTableChange}
            deleteTestReport={deleteTestReport}
            loading={tableLoading}
        />
    )
}

export default inject('testInstanceStore')(observer(HandReport))
