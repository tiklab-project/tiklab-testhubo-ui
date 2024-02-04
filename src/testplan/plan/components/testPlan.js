/*
 * @Description: 测试计划列表页
 * @LastEditTime: 2021-10-21 13:20:46
 */

import React, { useEffect, useState } from 'react';
import { observer, inject } from "mobx-react";
import {Input, Table, Space, Popconfirm, Empty, Select, Tag} from 'antd';
import TestPlanEdit from './testPlanEdit';
import  { useTranslation } from 'react-i18next'
import "./testPlanStyle.scss"
import emptyImg from "../../../assets/img/empty.png";
import IconCommon from "../../../common/IconCommon";
import {SearchOutlined} from "@ant-design/icons";
import PaginationCommon from "../../../common/pagination/Page";
import MenuSelect from "../../../common/menuSelect/MenuSelect";


const TestPlan = (props) => {
    const { testPlanStore } = props;
    const {
        findTestPlanPage,
        deleteTestPlan,
        testPlanList,
        totalPage,
    } = testPlanStore;

    const { t } = useTranslation();

    //列表头
    const columns = [
        {
            title:`计划名称`,
            dataIndex: "name",
            key: "name",
            width: "30%",
            render: (text,record) =>(
                <span className={"link-text"} onClick={()=>toPlanDetail(record.id)}>{text}</span>
            )
        },
        {
            title:`计划时间`,
            dataIndex: "planTime",
            key: "planTime",
            width: "25%",
            render:(text,record)=>(
                <span>{record.startTime} ~ {record.endTime}</span>
            )
        },
        {
            title: `用例数`,
            dataIndex: "testCaseNum",
            key: "testCaseNum",
            width: "15%",
            render:(text)=>(
                <span style={{color:"#3facff"}}>{text}</span>
            )
        },
        {
            title: `状态`,
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
                    <TestPlanEdit
                        name={`${t('tcedit')}`}
                        testPlanId={record.id}
                        type={"edit"}
                        findPage={findPage}
                    />

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

    const [selectItem, setSelectItem] = useState("all");
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
        findPage()
    },[pageParam])


    const showState = (type)=>{
        switch (type){
            case 0 :
                return <Tag >未开始</Tag>
            case 1 :
                return <Tag color={"blue"}>进行中</Tag>
            case 2 :
                return <Tag color={"green"}>结束</Tag>
        }
    }

    // 去往详情页
    const toPlanDetail = (id) => {
        sessionStorage.setItem('testPlanId',id);
        localStorage.setItem("leftRouter","/plan/case");
        props.history.push(`/plan/case`);
    };

    // 分页
    const onTableChange = (current) => {
        setCurrentPage(current)
        const newParams = {
            ...pageParam,
            pageParam: {
                pageSize: pageSize,
                currentPage: current
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
        let param={
            repositoryId:repositoryId,
            pageParam,
        }
        findTestPlanPage(param).then(()=>{
            setTableLoading(false)
        });
    }


    /**
     * 点击筛选项查找
     */
    const selectFn = (item)=>{

        setSelectItem(item.key)

        let param={
            repositoryId:repositoryId,
            pageParam,
            state:item.key
        }

        if(item.key==='all'){
            delete param.state
        }

        findTestPlanPage(param)
    }


    //项目筛选列表
    const items = [
        {
            title: '所有',
            key: `all`,
        },
        {
            title: '进行中',
            key: `1`,
        },
        {
            title: '未开始',
            key: `0`,
        },
        {
            title: '结束',
            key: `2`,
        },
    ];

    return(
        <div className={"content-box-center"}>
            <div className='header-box-space-between'>
                <div className={'header-box-title'}>测试计划</div>
                <TestPlanEdit
                    name={`添加计划`}
                    findPage={findPage}
                    type={"add"}
                />
            </div>

            <div className={"display-flex-between"} style={{margin:"0 0 10px 0"}}>
                <MenuSelect
                    menuItems={items}
                    selectFn={selectFn}
                    selected={selectItem}
                />

                <Input
                    placeholder={`${t('tcsearch')}`}
                    onPressEnter={onSearch}
                    className='search-input-common'
                    prefix={<SearchOutlined />}
                />
            </div>


            <div className={"table-list-box"}>
                <Table
                    className="tablelist"
                    columns={columns}
                    dataSource={testPlanList}
                    rowKey={record => record.id}
                    pagination={false}
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
                <PaginationCommon
                    currentPage={currentPage}
                    totalPage={totalPage}
                    changePage={onTableChange}
                />
            </div>
        </div>
    )
}

export default inject('testPlanStore')(observer(TestPlan));