import React, {useEffect, useState} from "react";
import {Button, Dropdown, Empty, Input, Menu, Popconfirm, Select, Space, Table, TreeSelect} from "antd";
import {inject, observer} from "mobx-react";
import "./testcaseStyle.scss"
import "./caseContantStyle.scss"
import emptyImg from "../../../assets/img/empty.png"
import ApiUnitEdit from "../../api/http/unit/components/apiUnitEdit";
import ApiSceneEdit from "../../api/http/scene/components/apiSceneEdit";
import ApiPerfEdit from "../../api/http/perf/components/apiPerfEdit";
import WebSceneEdit from "../../web/scene/components/webSceneEdit";
import WebPerfEdit from "../../web/perf/components/webPerfEdit";
import AppSceneEdit from "../../app/scene/components/appSceneEdit";
import AppPerfEdit from "../../app/perf/components/appPerfEdit";
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

const TestCaseList = (props) => {
    const {testcaseStore,categoryStore} = props;
    const {findCategoryListTreeTable,categoryTableList} = categoryStore;

    const {
        findTestCaseList,
        testcaseList,
        deleteTestCase,
        testType,
        setTestType,
        caseType,
        setCaseType
    }=testcaseStore;

    const column = [
        {
            title:`名称`,
            dataIndex: 'name',
            key: "name",
            render: (text,record) =>(
                <a onClick = {()=>toPage(record)}>{text}</a>
            )
        },{
            title: `模块`,
            dataIndex: ["category","name"],
            key: "category",
            // render: (text) =>(text?"-":text)
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


    useEffect(()=>{
        findPage(testType,caseType)
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
                break;
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


    //点击名称 先通过测试类型分类
    const toPage =(record)=>{

        switch (record.testType) {
            case "auto":
            case "perform":
                switchCaseType(record);
                break;
            case "function":
                sessionStorage.setItem(`funcUnitId`,record.id);
                props.history.push(`/repository/function-detail`)
                break;
        }
    }
    //再根据不同的用例类型跳到不同的页面
    const switchCaseType = (record)=>{

        switch (record.caseType) {
            case "api-unit":
                toDetailAddRouterCommon("apiUnitId",record)
                break;
            case "api-scene":
                toDetailAddRouterCommon("apiSceneId",record)
                break;
            case "api-perform":
                toDetailAddRouterCommon("apiPerfId",record)
                break;

            case "web-scene":
                toDetailAddRouterCommon("webSceneId",record)
                break;
            case "web-perform":
                toDetailAddRouterCommon("webPerfId",record)
                break;

            case "app-scene":
                toDetailAddRouterCommon("appSceneId",record)
                break;

            case "app-perform":
                toDetailAddRouterCommon("appPerfId",record)
                break;
        }
    }
    //跳转路由
    const toDetailAddRouterCommon = (setId,record)=>{
        sessionStorage.setItem(`${setId}`,record.id);
        props.history.push(`/repository/${record.caseType}-detail`)
    }


    //模块赛选
    const changeCategory=(value)=> {
        findPage(testType,caseType,value)
    }


    //渲染筛选项
    const showMenu = (data) =>{
        return data&&data.map(item=>{
            return(
                <div
                    key={item.key}
                    className={`ws-header-menu-item  ${item.key === selectItem ? "ws-header-menu-item-selected" : ""}`}
                    onClick={()=>selectKeyFun(item)}
                >
                    <span> {item.title} </span>

                </div>
            )
        })
    }

    //用例筛选
    const caseSelectFn = (type) =>{
        setCaseType(type)

        findPage(testType,type)
    }


    //点击筛选项查找
    const selectKeyFun = (item)=>{
        if(!item.key){
            setSelectItem(null)
            findPage(null,caseType)
            return
        }

        let key = item.key
        setSelectItem(key)
        setTestType(key)

        findPage(key,caseType)

    }

    //测试类型筛选项
    const items=[
        {
            key: null,
            title: '所有',
        },{
            key: 'auto',
            title: '自动化',
        },
        {
            key: 'perform',
            title: '性能',
        },{
            key: 'function',
            title: '功能',
        },
        // {
        //     key: 'func',
        //     title: '功能',
        // },
    ]



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


    //添加不同用例
    const addMenu =(
        <Menu>
            <Menu.SubMenu title="自动化测试" key={"auto-add"}>
                <Menu.Item key={"api-unit-add"}>
                    <ApiUnitEdit
                        name={"添加接口测试"}
                        type={"add"}
                        {...props}
                    />
                </Menu.Item>
                <Menu.Item key={"api-scene-add"}>
                    <ApiSceneEdit
                        name={"添加接口场景"}
                        type={"add"}
                        {...props}
                    />
                </Menu.Item>
                <Menu.Item key={"web-scene-add"}>
                    <WebSceneEdit
                        name={"添加Web用例"}
                        type={"add"}
                        {...props}
                    />
                </Menu.Item>
                <Menu.Item key={"app-scene-add"}>
                    <AppSceneEdit
                        name={"添加App用例"}
                        type={"add"}
                        {...props}
                    />
                </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu title="性能测试" key={"perform-add"}>
                <Menu.Item key={"api-perf-add"}>
                    <ApiPerfEdit
                        name={"添加接口性能"}
                        type={"add"}
                        {...props}
                    />
                </Menu.Item>

                <Menu.Item key={"web-perf-add"}>
                    <WebPerfEdit
                        name={"添加Web性能"}
                        type={"add"}
                        {...props}
                    />
                </Menu.Item>
                <Menu.Item key={"app-perf-add"}>
                    <AppPerfEdit
                        name={"添加App性能"}
                        type={"add"}
                        {...props}
                    />
                </Menu.Item>
            </Menu.SubMenu>

            <Menu.Item key={"function-add"}>
                <FuncUnitEdit
                    name={"添加功能用例"}
                    type={"add"}
                    {...props}
                />
            </Menu.Item>
        </Menu>
    )

    return(
        <div className={"testcase-box"} >
            <div  className={"header-box-space-between"} >
                <div className={'header-box-title'}>测试用例</div>
                <Dropdown overlay={addMenu} placement="bottom">
                    <Button className={"important-btn"}>添加用例</Button>
                </Dropdown>
            </div>

            <div className={"dynamic-select-box"}>
                <div className={"ws-header-menu-left"}>
                    {showMenu(items)}
                </div>

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

                    <Select
                        // defaultValue={null}
                        placeholder={"用例类型"}
                        className={"dynamic-select-box-item"}
                        onChange={caseSelectFn}
                        options={[
                            {
                                value: null,
                                label: '所有',
                            },{
                                value: 'api-unit',
                                label: '接口单元',
                            },
                            {
                                value: 'api-scene',
                                label: '接口场景',
                            },{
                                value: 'api-perform',
                                label: '接口性能',
                            },{
                                value: 'web-scene',
                                label: 'web场景',
                            },{
                                value: 'web-perform',
                                label: 'web性能',
                            },{
                                value: 'app-scene',
                                label: 'APP场景',
                            },{
                                value: 'app-perform',
                                label: 'APP性能',
                            },
                        ]}
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

    )


}

export default inject("testcaseStore","categoryStore")(observer(TestCaseList))