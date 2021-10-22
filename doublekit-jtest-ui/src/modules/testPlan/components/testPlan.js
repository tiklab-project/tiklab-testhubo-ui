/*
 * @Description: 测试计划列表页
 * @LastEditTime: 2021-10-21 13:20:46
 */

import React, { Fragment, useEffect, useState } from 'react';
import { observer, inject } from "mobx-react";
import {Breadcrumb, Input, Table, Space,  Popconfirm} from 'antd';
import TestPlanEdit from './testPlanEdit';
import  { useTranslation } from 'react-i18next'

const TestPlan = (props) => {
    const { testPlanStore } = props;
    const {
        findTestPlanPage,
        deleteTestPlan,
        testPlanList,
        totalRecord,
    } = testPlanStore;

    const { t } = useTranslation();

    //列表头
    const columns = [
        {
            title:`计划名称`,
            dataIndex: "name",
            key: "name",
            align:"center",
            render: (text,record) =>(
                <a onClick = {()=>setLocalStorage(record.id)}>{text}</a>
            )
        },
        {
            title:`起始时间`,
            dataIndex: "startTime",
            key: "startTIme",
            align:"center",
        },
        {
            title: `结束时间`,
            dataIndex: "endTime",
            key: "endTime",
            align:"center",
        },
        {
            title: `用例数`,
            dataIndex: "testcaseNumber",
            key: "testcaseNumber",
            align:"center",
        },
        {
            title: `进度`,
            dataIndex: "state",
            key: "desc",
            align:"center",
        },
        {
            title: `描述`,
            dataIndex: "desc",
            key: "desc",
            align:"center",
        },
        {
            title: ` ${t('tcoperation')}`,
            key: "action",
            align:"center",
            render: (text, record) => (
                <Space size="middle">
                    <div>
                        <TestPlanEdit name={`${t('tcedit')}`}  testPlanId={record.id} />
                    </div>
                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() =>deleteTestPlan(record.id)}
                        okText='确定'
                        cancelText='取消'
                    >
                        <a href="#" style={{color:'red'}}>{t('tcdelete')}</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ]

    const [pageSize] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [params, setParams] = useState({
        pageParam: {
            pageSize: pageSize,
            currentPage: currentPage
        }
    })
    const [tableLoading,setTableLoading] = useState(true);
    const repositoryId = localStorage.getItem('repositoryId')

    useEffect(()=> {
        findTestPlanPage(repositoryId,params).then(()=>{
            setTableLoading(false)
        });
    },[params])

    // 保存id到缓存
    const setLocalStorage = (id) => {
        localStorage.setItem('testPlanId',id);
        props.history.push('/repositorypage/testplandetail');
    }

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

    //搜索
    const onSearch = (e) => {
        setCurrentPage(1)
        let newParams = {
            pageParam: {
                pageSize: pageSize,
                currentPage: 1
            },
        }
        if (e.target.value) {
            newParams = {
                pageParam: {
                    pageSize: pageSize,
                    currentPage: 1
                },
                name:e.target.value,
            }
        }
        setParams(newParams)
    }

    return(
        <Fragment>
            <div className='breadcrumb'>
                <Breadcrumb separator=">"  >
                    <Breadcrumb.Item>用例库</Breadcrumb.Item>
                    <Breadcrumb.Item>用例库</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className='search-btn'>
                <Input
                    placeholder={`${t('tcsearch')}`}
                    onPressEnter={onSearch}
                    className='search-input'
                />
                <TestPlanEdit className="important-btn" name={`添加计划`}/>
            </div>

            <Table
                bordered
                className="tablelist"
                columns={columns}
                dataSource={testPlanList}
                rowKey={record => record.id}
                pagination={{
                    current:currentPage,
                    pageSize:pageSize,
                    total:totalRecord,
                }}
                onChange = {(pagination) => onTableChange(pagination)}
                loading={tableLoading}
            />
        </Fragment>
    )
}

export default inject('testPlanStore')(observer(TestPlan));