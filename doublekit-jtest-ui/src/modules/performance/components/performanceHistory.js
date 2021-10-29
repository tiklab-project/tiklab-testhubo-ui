/**
 * @description：性能测试历史
 * @date: 2021-08-26 09:30
 */
import React, {useEffect, useState} from 'react';
import {inject, observer} from "mobx-react";
import {Breadcrumb, Button, Popconfirm, Space, Table} from "antd";
import PerformanceHistoryDetail from "./performanceHistoryDetail";

const PerformanceHistory = (props) => {
    const {performanceStatisticsStore} = props;
    const {
        findPerformanceStatisticsPage,
        performanceStatisticsList,
        totalRecord,
        deletePerformanceStatistics
    } = performanceStatisticsStore;

    const columns = [
        {
            title:`测试名称`,
            dataIndex: ['testCase','name'],
            key: "name",
            align:"center",
            width:'15%'
        },{
            title:`结果`,
            dataIndex: "result",
            key: "result",
            align:"center",
            width:'10%',
            render:(text,record)=> text === 'succeed' ? '成功' : '失败'
        },{
            title: `总耗时`,
            dataIndex: 'alltime',
            key: "alltime",
            align:"center",
            width:'10%'
        },{
            title: `用例`,
            dataIndex: 'percentText',
            key: "percentText",
            align:"center",
            width:'15%'
        },{
            title:`类型`,
            dataIndex: 'testType',
            key: "testType",
            align:"center",
            width:'10%'
        },{
            title: `测试人`,
            dataIndex: ["user",'name'],
            key: "user",
            align:"center",
            width:'10%'
        },{
            title: `测试时间`,
            dataIndex: "createTime",
            key: "createTime",
            align:"center",
            width:'15%'
        },
        {
            title: `操作`,
            key: "action",
            align:"center",
            width:'15%',
            render: (text, record) => (
                <Space size="middle">
                    <PerformanceHistoryDetail itemId={record.id}/>
                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() =>deletePerformanceStatistics(record.id)}
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
    const performanceId = localStorage.getItem('performanceId');

    useEffect(()=> {
        findPerformanceStatisticsPage(performanceId,params).then(()=>{
            setTableLoading(false)
        });
    },[performanceId,params])

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

    //返回
    const goBack = () => {
        props.history.push('/repositorypage/performancedetail');
    }

    return(
        <>
            <div className='header-flexbox'>
                <Breadcrumb separator=">" >
                    <Breadcrumb.Item>性能测试</Breadcrumb.Item>
                    <Breadcrumb.Item>性能测试历史</Breadcrumb.Item>
                </Breadcrumb>
                <Button className="important-btn" onClick={goBack}>返回</Button>
            </div>
            <Table
                className="tablelist"
                columns={columns}
                dataSource={performanceStatisticsList}
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

export default inject('performanceStatisticsStore')(observer(PerformanceHistory));
