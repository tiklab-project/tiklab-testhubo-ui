/**
 * @description：
 * @date: 2021-08-26 09:30
 */
import React, {useEffect, useState} from 'react';
import {inject, observer} from "mobx-react";
import {Popconfirm, Space, Table} from "antd";
import TestReportDetail from "./testReportDetail";

const ReportTable = (props) => {
    const {testInstanceStore} = props;
    const {
        findReposter,
        testReportList,
        totalRecord,
        deleteTestReport
    } = testInstanceStore;

    const columns = [
        {
            title:`测试名称`,
            dataIndex: ['testCase','name'],
            key: "name",
            align:"center",
        },
        {
            title:`类型`,
            dataIndex: 'testType',
            key: "testType",
            align:"center",
        },
        {
            title:`测试状态`,
            dataIndex: "result",
            key: "result",
            align:"center",
            render:(text,record)=> text === 'succeed' ? '成功' : '失败'
        },
        {
            title: `测试正确率（%）`,
            dataIndex: 'percentText',
            key: "percentText",
            align:"center",
        },
        {
            title: `测试人`,
            dataIndex: ["user",'name'],
            key: "user",
            align:"center",
        },
        {
            title: `测试时间`,
            dataIndex: "createTime",
            key: "createTime",
            align:"center",
        },
        {
            title: `操作`,
            key: "action",
            align:"center",
            render: (text, record) => (
                <Space size="middle">
                    <TestReportDetail instanceId={record.id} testType={record.testType} name={'测试详情'}/>
                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() =>deleteTestReport(record.id)}
                        okText='确定'
                        cancelText='取消'
                    >
                        <a href="#" style={{color:'red'}}>删除</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ]

    const [pageSize] = useState(10);
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
        findReposter(repositoryId,params).then((res)=>{
            setTableLoading(false)
        });
    },[repositoryId,params])

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
        <>
            <Table
                className="tablelist"
                columns={columns}
                dataSource={testReportList}
                rowKey={record => record.id}
                pagination={{
                    current:currentPage,
                    pageSize:pageSize,
                    total:totalRecord,
                }}
                onChange={onTableChange}
                loading={tableLoading}
            />
        </>
    )
}

export default inject('testInstanceStore')(observer(ReportTable));
