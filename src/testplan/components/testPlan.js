/*
 * @Description: 测试计划列表页
 * @LastEditTime: 2021-10-21 13:20:46
 */

import React, { Fragment, useEffect, useState } from 'react';
import { observer, inject } from "mobx-react";
import {Breadcrumb, Input, Table, Space, Popconfirm, Empty, Select} from 'antd';
import TestPlanEdit from './testPlanEdit';
import  { useTranslation } from 'react-i18next'
import "./testPlanStyle.scss"
import emptyImg from "../../assets/img/empty.png";
import IconCommon from "../../common/IconCommon";
import {SearchOutlined} from "@ant-design/icons";

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
            render: (text,record) =>(
                <a onClick = {()=>setLocalStorage(record.id)}>{text}</a>
            )
        },
        {
            title:`起始时间`,
            dataIndex: "startTime",
            key: "startTIme",
        },
        {
            title: `结束时间`,
            dataIndex: "endTime",
            key: "endTime",
        },
        {
            title: `用例数`,
            dataIndex: "testCaseNum",
            key: "testCaseNum",
        },
        {
            title: `进度`,
            dataIndex: "state",
            key: "desc",
            render: (text,record) =>(showState(record.state))
        },
        // {
        //     title: `执行人`,
        //     dataIndex: ["principal",'name'],
        //     key: "principal",
        // },
        // {
        //     title: `描述`,
        //     dataIndex: "desc",
        //     key: "desc",
        // },
        {
            title: ` ${t('tcoperation')}`,
            key: "action",
            width:150,
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
                        <IconCommon
                            className={"icon-s edit-icon"}
                            icon={"shanchu3"}
                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ]

    const [pageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageParam, setPageParam] = useState({
        pageParam: {
            pageSize: pageSize,
            currentPage: currentPage
        }
    })
    const [tableLoading,setTableLoading] = useState(true);
    const repositoryId = sessionStorage.getItem('repositoryId')

    useEffect(()=> {
        findTestPlanPage(repositoryId,pageParam).then(()=>{
            setTableLoading(false)
        });
    },[pageParam])

    // 保存id到缓存
    const setLocalStorage = (id) => {
        sessionStorage.setItem('testPlanId',id);
        props.history.push('/repository/plan-detail');
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
            ...pageParam,
            pageParam: {
                pageSize: pageSize,
                currentPage: pagination.current
            },
        }
        setPageParam(newParams)
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
        setPageParam(newParams)
    }

    const findPage = ()=>{
        findTestPlanPage(repositoryId,pageParam)
    }

    const progressSelectFn = (state) =>{

        let param= Object.assign({},pageParam,{state:state})

        findTestPlanPage(repositoryId,param)
    }

    return(
        <div className={"testcase-box"}>
            <div className='header-box-space-between'>
                <div className={'header-box-title'}>测试计划</div>
                <TestPlanEdit
                    name={`添加计划`}
                    findPage={findPage}
                />
            </div>
            <div className='search-btn'>

                <Input
                    placeholder={`${t('tcsearch')}`}
                    onPressEnter={onSearch}
                    className='search-input-common'
                    prefix={<SearchOutlined />}
                />

                <Select
                    // defaultValue={null}
                    placeholder={"进度"}
                    className={"progress-select-box-item"}
                    onChange={progressSelectFn}
                    options={[
                        {
                            value: null,
                            label: '所有',
                        },{
                            value: 0,
                            label: '未开始',
                        },
                        {
                            value: 1,
                            label: '进行中',
                        },{
                            value: 2,
                            label: '结束',
                        },
                    ]}
                />

            </div>
            <div className={"table-list-box"}>
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
                    locale={{
                        emptyText: <Empty
                            imageStyle={{
                                height: 120,
                            }}
                            description={<span>暂无计划</span>}
                            image={emptyImg}
                        />,
                    }}
                />
            </div>
        </div>
    )
}

export default inject('testPlanStore')(observer(TestPlan));