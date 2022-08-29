/*
 * @Description: 测试计划列表页
 * @LastEditTime: 2021-10-21 13:20:46
 */

import React, { Fragment, useEffect, useState } from 'react';
import { observer, inject } from "mobx-react";
import {Breadcrumb, Input, Table, Space,  Popconfirm} from 'antd';
import TestPlanEdit from './testPlanEdit';
import  { useTranslation } from 'react-i18next'
import "./testPlanStyle.scss"

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
            dataIndex: "testCaseNum",
            key: "testCaseNum",
            align:"center",
        },
        {
            title: `进度`,
            dataIndex: "state",
            key: "desc",
            align:"center",
            render: (text,record) =>(showState(record.state))
        },
        // {
        //     title: `执行人`,
        //     dataIndex: ["principal",'name'],
        //     key: "principal",
        //     align:"center",
        // },
        // {
        //     title: `描述`,
        //     dataIndex: "desc",
        //     key: "desc",
        //     align:"center",
        // },
        {
            title: ` ${t('tcoperation')}`,
            key: "action",
            align:"center",
            render: (text, record) => (
                <Space size="middle">
                    <div>
                        <TestPlanEdit
                            name={`${t('tcedit')}`}
                            testPlanId={record.id}
                            type={"edit"}
                        />
                    </div>
                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() =>deleteTestPlan(record.id).then(()=>findPage())}
                        okText='确定'
                        cancelText='取消'
                    >
                        <a href="#" style={{color:'red'}}>{t('tcdelete')}</a>
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
    const [tableLoading,setTableLoading] = useState(true);
    const repositoryId = sessionStorage.getItem('repositoryId')

    useEffect(()=> {
        findTestPlanPage(repositoryId,params).then(()=>{
            setTableLoading(false)
        });
    },[params])

    // 保存id到缓存
    const setLocalStorage = (id) => {
        sessionStorage.setItem('testPlanId',id);
        props.history.push('/repositorypage/testplandetail');
    };

    const showState = (type)=>{
        switch (type){
            case 0 :
                return '未开始'
            case 1 :
                return '进行中'
            case 2 :
                return '结束'
        }
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

    const findPage = ()=>{
        findTestPlanPage(repositoryId,params)
    }

    return(
        <div className={"teston-page-center"}>
            <div className='breadcrumb'>
                <Breadcrumb separator=">"  >
                    <Breadcrumb.Item>用例库</Breadcrumb.Item>
                    <Breadcrumb.Item>测试计划</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className='search-btn'>
                <TestPlanEdit
                    name={`添加计划`}
                    findPage={findPage}
                />
                <Input
                    placeholder={`${t('tcsearch')}`}
                    onPressEnter={onSearch}
                    className='search-input'
                />

            </div>

            <Table
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
        </div>
    )
}

export default inject('testPlanStore')(observer(TestPlan));