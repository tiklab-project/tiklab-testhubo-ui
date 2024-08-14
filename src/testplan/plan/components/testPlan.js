/*
 * @Description: 测试计划列表页
 * @LastEditTime: 2021-10-21 13:20:46
 */
import React, { useEffect, useState } from 'react';
import { observer, inject } from "mobx-react";
import {Input, Table, Space, Empty, Tag} from 'antd';
import TestPlanEdit from './testPlanEdit';
import  { useTranslation } from 'react-i18next'
import "./testPlanStyle.scss"
import PaginationCommon from "../../../common/pagination/Page";
import MenuSelect from "../../../common/menuSelect/MenuSelect";
import HideDelete from "../../../common/hideDelete/HideDelete";
import PlanInstanceDrawer from "../../instance/components/PlanInstanceDrawer";
import PageContent from "../../../common/pageContent/PageContent";
import IconCommon from "../../../common/IconCommon";
import {debounce} from "../../../common/utils/commonFn";
import ListIcon from "../../../common/ListIcon/ListIcon";

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
            width: "25%",
            render: (text,record,index) =>(
                <div className={"display-flex-gap"}>
                    <ListIcon
                        text={text}
                        isMar={false}
                        colors={index+1 % 7}
                        className={`icon-l`}
                    />
                    <span className={"link-text text-ellipsis"} onClick={()=>toPlanDetail(record)}>{text}</span>
                </div>
            )
        },
        {
            title:`计划时间`,
            dataIndex: "planTime",
            key: "planTime",
            width: "28%",
            render:(text,record)=>(
                <span className={"text-ellipsis"}>{record.startTime} ~ {record.endTime}</span>
            )
        },
        {
            title: `类型`,
            dataIndex: "type",
            key: "type",
            width: "10%",
            render:(text,record)=>text==="function"?<span>功能</span>:<span>自动化</span>
        },
        {
            title: `最近执行`,
            dataIndex: "recentInstance",
            key: "principal",
            width: "10%",
            render:(text,record)=>(
                <PlanInstanceDrawer instance={record?.recentInstance} {...props} />
            )
        },
        {
            title: `用例数`,
            dataIndex: "testCaseNum",
            key: "testCaseNum",
            width: "7%",
            render:(text)=>(
                <span style={{color:"#3facff"}}>{text}</span>
            )
        },
        {
            title: `状态`,
            dataIndex: "state",
            key: "state",
            width: "10%",
            render: (text,record) =>(showState(record.state))
        },

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

                    <HideDelete
                        deleteFn={() =>deleteTestPlan(record.id).then(()=>findPage())}
                    />
                </Space>
            ),
        },
    ]

    const [selectItem, setSelectItem] = useState("all");
    const [pageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecord, setTotalRecord] = useState();
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
    const toPlanDetail = (record) => {
        sessionStorage.setItem('testPlanId',record.id);
        localStorage.setItem("testPlanType",record.type)
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
        findPage(newParams)
    }

    const findPage = (params)=>{
        setTableLoading(true)
        let param={
            repositoryId:repositoryId,
            pageParam,
            ...params
        }
        findTestPlanPage(param).then((res)=>{
            setTableLoading(false)
            setTotalRecord(res.totalRecord)
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
        <PageContent>
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
                        style={{width: `240px`}}
                    />

                    <Input
                        placeholder={`搜索计划名`}
                        onPressEnter={onSearch}
                        className='search-input-common'
                        prefix={<IconCommon
                            icon={"sousuo"}
                            className={"icon-s"}
                        />}
                        onChange={debounce(onSearch,500) }
                        allowClear
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
                                imageStyle={{height: 100}}
                                description={<span>暂无计划</span>}
                            />,
                        }}
                    />
                    <PaginationCommon
                        currentPage={currentPage}
                        totalPage={totalPage}
                        changePage={onTableChange}
                        totalRecord={totalRecord}
                        findPage={findPage}
                    />
                </div>
            </div>
        </PageContent>
    )
}

export default inject('testPlanStore')(observer(TestPlan));