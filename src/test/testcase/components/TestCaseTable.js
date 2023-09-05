import React, {useEffect, useState} from "react";
import { Empty, Input, Popconfirm, Space, Table, TreeSelect} from "antd";
import {inject, observer} from "mobx-react";
import emptyImg from "../../../assets/img/empty.png"
import IconCommon from "../../../common/IconCommon";
import {showCaseTypeView, showTestTypeView} from "../../../common/caseCommon/CaseCommonFn";
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
import {useHistory} from "react-router";
import TestCaseDrawer from "../../common/TestCaseDrawer";
import DropdownAdd from "./DropdownAdd";
import "./testcaseStyle.scss"
import "./caseContantStyle.scss"
import TestCaseMenu from "./TestCaseMenu";
import {getUser} from "tiklab-core-ui";

const TestCaseTable = (props) => {
    const {testcaseStore,categoryStore} = props;
    const {findCategoryListTreeTable,categoryTableList} = categoryStore;

    const {
        findTestCaseList,
        testcaseList,
        deleteTestCase,
        testType,
        setTestType
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
                        onConfirm={() =>deleteTestCase(record.id).then(()=>findPage())}
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


    const [selectItem, setSelectItem] = useState(null);
    const [selectCategory, setSelectCategory] = useState(null);
    const [totalRecord, setTotalRecord] = useState();
    const [pageSize] = useState(12);
    const [currentPage, setCurrentPage] = useState(1);
    let userId = getUser().userId
    const repositoryId = sessionStorage.getItem("repositoryId")

    let history = useHistory();

    useEffect(()=>{
        findPage()
        history.push("/repository/testcase")
    },[])

    useEffect(()=>{
        findCategoryListTreeTable(repositoryId)
    },[])

    const findPage = (params) =>{
        let param = {
            pageParam: {
                pageSize: pageSize,
                currentPage:1
            },
            testType:testType,
            repositoryId:repositoryId,
            categoryId:selectCategory,
            ...params
        }
        findTestCaseList(param).then((res)=>{
            setTotalRecord(res.totalRecord);
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

        let param = {categoryId:categoryId}
        findPage(param)
    }

    //点击测试类型筛选项查找
    const testCaseSelectFn = (testType)=>{
        if(!testType){
            setTestType(null)

            let param = {testType:null}
            findPage(param)
            return
        }

        setTestType(testType)

        let param = {testType:testType}
        findPage(param)
    }


    //用例筛选
    const caseSelectFn = (caseType) =>{
        setCurrentPage(1)

        let param = {caseType:caseType}
        findPage(param);
    }


    //点击测试类型筛选项查找
    const selectKeyFun = (item)=>{
        let key = item.key

        setSelectItem(key)

        let param
        switch (key) {
            case "createUser":
                param = {"createUser":userId};
                break;
        }


        findPage(param)
    }

    // 分页
    const onTableChange = (pagination) => {
        setCurrentPage(pagination.current)

        let param = {
            pageParam: {
                pageSize: pageSize,
                currentPage:pagination.current
            },
        }

        findPage(param)
    }

    //搜索
    const onSearch = (e) =>{
        setCurrentPage(1)
        let param = {name: e.target.value}

        findPage(param)
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
                    </div>

                </div>

                <div className={"dynamic-select-box"}>
                    <TestCaseMenu
                        selectItem={selectItem}
                        selectKeyFun={selectKeyFun}
                    />

                    <Space>
                        <TestTypeSelect setTestType={testCaseSelectFn}/>

                        <CaseTypeSelect
                            caseSelectFn={caseSelectFn}
                            testType={testType}
                        />

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