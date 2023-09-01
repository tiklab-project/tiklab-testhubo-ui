import React, {useEffect, useState} from "react";
import {Button, Dropdown, Empty, Input, Menu, Popconfirm, Select, Space, Table, TreeSelect} from "antd";
import {inject, observer} from "mobx-react";

import emptyImg from "../../../assets/img/empty.png"
import ApiUnitEdit from "../../api/http/unit/components/apiUnitEdit";
import ApiSceneEdit from "../../api/http/scene/components/apiSceneEdit";
import ApiPerfEdit from "../../api/http/perf/components/apiPerfEdit";
import WebSceneEdit from "../../web/scene/components/webSceneEdit";
import AppSceneEdit from "../../app/scene/components/appSceneEdit";
import IconCommon from "../../../common/IconCommon";
import {showCaseTypeView, showTestTypeView} from "../../../common/caseCommon/CaseCommonFn";
import FuncUnitEdit from "../../function/components/funcUnitEdit";
import {SearchOutlined} from "@ant-design/icons";
import ApiUnitInstanceDrawer from "../../api/http/unit/components/apiUnitInstanceDrawer";
import ApiSceneInstanceDrawer from "../../api/http/scene/components/apiSceneInstanceDrawer";
import WebSceneInstanceDrawer from "../../web/scene/components/webSceneInstanceDrawer";
import AppSceneInstanceDrawer from "../../app/scene/components/appSceneInstanceDrawer";
import ApiPerformInstanceDrawer from "../../api/http/perf/components/apiPerformInstanceDrawer";
import WebPerformInstanceDrawer from "../../web/perf/components/webPerformInstanceDrawer";
import AppPerformInstanceDrawer from "../../app/perf/components/appPerformInstanceDrawer";
import TestTypeSelect from "./TestTypeSelect";
import CaseTypeSelect from "./CaseTypeSelect";
import PostInApiToCase from "../../../integrated/postin/postinApiCopy/components/PostInApiToCase";
import {useHistory, useLocation} from "react-router";
import TestCaseDrawer from "../../common/TestCaseDrawer";
import DropdownAdd from "./DropdownAdd";

const TestCaseTable = (props) => {
    const {testcaseStore,categoryStore,togglePage} = props;
    const {findCategoryListTreeTable,categoryTableList} = categoryStore;

    const {
        findTestCaseList,
        testcaseList,
        deleteTestCase,
        testType,
        setTestType,
        caseType,
        setCaseType,
        testCaseRecent
    }=testcaseStore;


    const column = [
        {
            title:`名称`,
            dataIndex: 'name',
            key: "name",
            render: (text,record) =>(<TestCaseDrawer caseData={record} {...props}/> )
        },{
            title: `模块`,
            dataIndex: ["category","name"],
            key: "category",
        },{
            title: `测试类型`,
            dataIndex: "testType",
            key: "testType",
            render: (text) =>(showTestTypeView(text))
        },{
            title: `用例类型`,
            dataIndex: "caseType",
            key: "caseType",
            render: (text) =>(showCaseTypeView(text))
        },
        {
            title: `最近执行`,
            dataIndex: "recentInstance",
            key: "recentInstance",
            render:(text,record)=>(
                showRecentInstance(record)
            )
        },
        {
            title: `创建时间`,
            dataIndex: 'createTime',
            key: "createTime",
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            width: 150,
            render: (text, record) => (
                <Space size="middle">
                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() =>deleteTestCase(record.id).then(()=>findPage(testType,caseType))}
                        okText='确定'
                        cancelText='取消'
                    >
                        <IconCommon
                            className={"icon-s edit-icon"}
                            icon={"shanchu3"}
                        />
                    </Popconfirm>
                </Space>
            )
        },
    ]

    const [selectItem, setSelectItem] = useState(testType?testType:null);
    const [selectCategory, setSelectCategory] = useState(null);
    const [totalRecord, setTotalRecord] = useState();
    const [pageSize] = useState(12);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageParam, setPageParam] = useState({
        pageParam: {
            pageSize: pageSize,
            currentPage: currentPage
        }
    })

    const repositoryId = sessionStorage.getItem("repositoryId")

    let history = useHistory();

    useEffect(()=>{
        findPage(testType,caseType)
        history.push("/repository/testcase")
    },[pageParam])

    useEffect(()=>{
        findCategoryListTreeTable(repositoryId)
    },[])

    const findPage = (testType,caseType,categoryId) =>{
        const param = {
            repositoryId:repositoryId,
            categoryId:categoryId,
            testType:testType,
            caseType:caseType,
            ...pageParam
        }
        findTestCaseList(param).then((res)=>{
            setTotalRecord(res.totalRecord)
        })
    }

    //表格中最近执行展示
    const showRecentInstance = (record) =>{
        let recent = record.recentInstance

        switch (record.caseType) {
            case "api-unit":
                return recent.result===2?<div>--</div>:<ApiUnitInstanceDrawer name={showRecent(recent)} apiUnitInstanceId={recent.instanceId} />
            case "api-scene":
                return recent.result===2?<div>--</div>:<ApiSceneInstanceDrawer name={showRecent(recent)} apiSceneInstanceId={recent.instanceId}/>
            case "api-perform":
                return recent.result===2?<div>--</div>:<ApiPerformInstanceDrawer name={showRecent(recent)} apiPerfInstanceId={recent.instanceId} />
            case "web-scene":
                return recent.result===2?<div>--</div>:<WebSceneInstanceDrawer name={showRecent(recent)} webSceneInstanceId={recent.instanceId} />
            case "web-perform":
                return recent.result===2?<div>--</div>:<WebPerformInstanceDrawer name={showRecent(recent)} webPerfInstanceId={recent.instanceId} />
            case "app-scene":
                return recent.result===2?<div>--</div>:<AppSceneInstanceDrawer name={showRecent(recent)} appSceneInstanceId={recent.instanceId}/>
            case "app-perform":
                return recent.result===2?<div>--</div>:<AppPerformInstanceDrawer name={showRecent(recent)} appPerfInstanceId={recent.instanceId} />
        }
    }
    const showRecent=(recentInstance)=>{
        switch (recentInstance.result) {
            case 0:
                return <span>失败 #{recentInstance.executeNumber}</span>
            case 1:
                return <span>成功 #{recentInstance.executeNumber}</span>
        }
    }


    //模块赛选
    const changeCategory=(categoryId)=> {
        setSelectCategory(categoryId)

        findPage(selectItem,caseType,categoryId)
    }


    //用例筛选
    const caseSelectFn = (type) =>{
        setCaseType(type)

        findPage(selectItem,type,selectCategory)
    }


    //点击测试类型筛选项查找
    const selectKeyFun = (item)=>{
        if(!item.key){
            setTestType(null)
            setSelectItem(null)
            findPage(null,caseType,selectCategory)
            return
        }

        let key = item.key
        setSelectItem(key)
        setTestType(key)

        findPage(key,caseType,selectCategory)
    }

    // 分页
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
    const onSearch = (e) =>{
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


    return(
        <>
            <div className={"testcase-box"} >
                <div  className={"header-box-space-between"} >
                    <div className={'header-box-title'}>测试用例</div>
                    <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
                        <DropdownAdd
                            findPage={findPage}
                            {...props}
                        />
                        <IconCommon
                            className={"icon-l "}
                            icon={"qiehuan1"}
                            onClick={()=>togglePage("list")}
                            style={{cursor:"pointer"}}
                        />
                    </div>

                </div>

                <div className={"dynamic-select-box"}>
                    <TestTypeSelect
                        selectItem={selectItem}
                        selectKeyFun={selectKeyFun}
                        style={{width: "360px"}}
                    />

                    <Space>

                        <TreeSelect
                            fieldNames={{ label: 'name', value: 'id', children: 'children' }}
                            style={{  width: '150px'}}
                            dropdownStyle={{
                                maxHeight: 400,
                                overflow: 'auto',
                            }}
                            className={"dynamic-select-box-item"}
                            placeholder="模块"
                            allowClear
                            treeDefaultExpandAll
                            onChange={changeCategory}
                            treeData={categoryTableList}
                        />

                        <CaseTypeSelect
                            caseSelectFn={caseSelectFn}
                            testType={selectItem}
                        />

                        <Input
                            placeholder={`搜索用例`}
                            onPressEnter={onSearch}
                            className='search-input-common'
                            prefix={<SearchOutlined />}
                        />
                    </Space>

                </div>

                <div className={"table-list-box"}>
                    <Table
                        columns={column}
                        dataSource={testcaseList}
                        rowKey = {record => record.id}
                        pagination={{
                            current:currentPage,
                            pageSize:pageSize,
                            total:totalRecord,
                        }}
                        onChange = {(pagination) => onTableChange(pagination)}
                        locale={{
                            emptyText: <Empty
                                imageStyle={{height: 120}}
                                description={<span>暂无用例</span>}
                                image={emptyImg}
                            />,
                        }}
                    />
                </div>
            </div>
        </>
    )
}

export default inject("testcaseStore","categoryStore")(observer(TestCaseTable))