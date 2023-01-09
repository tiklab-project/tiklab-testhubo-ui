import React, {useEffect, useState} from "react";
import {Button, Dropdown, Empty, Input, Menu, Popconfirm, Select, Space, Table} from "antd";
import {inject, observer} from "mobx-react";
import "./testcaseStyle.scss"
import emptyImg from "../../../assets/img/empty.png"
import ApiUnitEdit from "../../apitest/http/unitcase/components/apiUnitEdit";
import ApiSceneEdit from "../../apitest/http/scenecase/components/apiSceneEdit";
import ApiPerfEdit from "../../apitest/http/performcase/components/apiPerfEdit";
import WebUnitEdit from "../../webtest/unitcase/components/webUnitEdit";
import WebSceneEdit from "../../webtest/scenecase/components/webSceneEdit";
import WebPerfEdit from "../../webtest/performcase/components/webPerfEdit";
import AppUnitEdit from "../../apptest/unitcase/components/appUnitEdit";
import AppSceneEdit from "../../apptest/scenecase/components/appSceneEdit";
import AppPerfEdit from "../../apptest/performcase/components/appPerfEdit";
import FuncUnitEdit from "../../functest/unitcase/components/funcUnitEdit";
import FuncSceneEdit from "../../functest/scenecase/components/funcSceneEdit";
import IconCommon from "../../common/iconCommon";


const TestCaseList = (props) => {
    const {testcaseStore,categoryStore} = props;
    const {findTestCaseList,testcaseList,deleteTestCase,tabList,setTabList,setActiveKey}=testcaseStore;

    const column = [
        {
            title:`名称`,
            dataIndex: 'name',
            key: "name",
            render: (text,record) =>(
                <a onClick = {()=>toPage(record)}>{text}</a>
            )
        },
        {
            title: `测试类型`,
            dataIndex: "testType",
            key: "testType",
            render: (text,record) =>(showTestTypeView(text))
        },{
            title: `用例类型`,
            dataIndex: "caseType",
            key: "caseType",
            render: (text,record) =>(showCaseTypeView(text))
        },
        {
            title: `创建时间`,
            dataIndex: 'createTime',
            key: "createTime",
        },

        // {
        //     title: `等级`,
        //     dataIndex: "level",
        //     key: "level",
        // },
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
    const [testType, setTestType] = useState();
    const [caseType, setCaseType] = useState();

    const [totalRecord, setTotalRecord] = useState();
    const [pageSize] = useState(12);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageParam, setPageParam] = useState({
        pageParam: {
            pageSize: pageSize,
            currentPage: currentPage
        }
    })


    const categoryId = sessionStorage.getItem("categoryId")
    const repositoryId = sessionStorage.getItem("repositoryId")


    useEffect(()=>{
        findPage()
    },[categoryId,pageParam])


    const findPage = (testType,caseType) =>{
        const param = {
            categoryId:categoryId,
            testType:testType,
            caseType:caseType,
            ...pageParam
        }
        findTestCaseList(param).then((res)=>{
            setTotalRecord(res.totalRecord)
        })
    }

    //点击名称不同的类型的用例跳到不同页面
    const toPage =(record)=>{

        let list = [...tabList]

        let newList =  list.filter(item=>item.id!==record.id)
        newList.push(record)
        setTabList(newList)
        setActiveKey(record.id)

        switch (record.testType) {
            case "api":
                switchCaseType(record);
                break;
            case "web":
                switchCaseType(record);
                break;
            case "app":
                switchCaseType(record);
                break;
            case "func":
                switchCaseType(record);
                break;
        }
    }

    const switchCaseType = (record)=>{
        localStorage.setItem("testType",record.testType)
        switch (record.caseType) {
            case "unit":
                sessionStorage.setItem(`${record.testType}UnitId`,record.id);
                props.history.push(`/repositorypage/testcase/${record.testType}-unitdetail`)
                break;
            case "scene":
                sessionStorage.setItem(`${record.testType}SceneId`,record.id);
                props.history.push(`/repositorypage/testcase/${record.testType}-scenedetail`)
                break;
            case "perform":
                sessionStorage.setItem(`${record.testType}PerfId`,record.id);
                props.history.push(`/repositorypage/testcase/${record.testType}-performdetail`)
                break;
        }
    }

    //表格中测试类型展示
    const showTestTypeView = (type)=>{
        switch (type) {
            case "api":
                return "接口"
            case "web":
                return "WEB"
            case "app":
                return "APP"
            case "func":
                return "功能"
        }
    }

    //表格中用例类型展示
    const showCaseTypeView = (type)=>{
        switch (type) {
            case "unit":
                return "单元"
            case "scene":
                return "场景"
            case "perform":
                return "性能"
        }
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

    //点击筛选项查找
    const selectKeyFun = (item)=>{
        setSelectItem(item.key)
        setTestType(item.key)

        findPage(item.key,caseType)
    }

    const items=[
        {
            key: null,
            title: '所有',
        },{
            key: 'api',
            title: '接口',
        },
        {
            key: 'web',
            title: 'WEB',
        },{
            key: 'app',
            title: 'APP',
        },{
            key: 'func',
            title: '功能',
        },
    ]


    //用例筛选
    const caseSelectFn = (type) =>{
        setCaseType(type)

        findPage(testType,type)
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


    const addMenu =(
        <Menu>
            <Menu.SubMenu title="接口添加" key={"api-add"}>
                <Menu.Item key={"api-unit-add"}>
                    <ApiUnitEdit
                        name={"添加Unit用例"}
                        isCategory={true}
                        categoryId={categoryId}
                        findList={findPage}
                    />
                </Menu.Item>
                <Menu.Item key={"api-scene-add"}>
                    <ApiSceneEdit
                        name={"添加场景用例"}
                        isCategory={true}
                        categoryId={categoryId}
                        findList={findPage}
                    />
                </Menu.Item>
                <Menu.Item key={"api-perf-add"}>
                    <ApiPerfEdit
                        name={"添加压测用例"}
                        isCategory={true}
                        categoryId={categoryId}
                        findList={findPage}
                    />
                </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu title="WEB添加" key={"web-add"}>
                <Menu.Item key={"web-unit-add"}>
                    <WebUnitEdit
                        name={"添加Unit用例"}
                        isCategory={true}
                        categoryId={categoryId}
                        findList={findPage}
                    />
                </Menu.Item>
                <Menu.Item key={"web-scene-add"}>
                    <WebSceneEdit
                        name={"添加场景用例"}
                        isCategory={true}
                        categoryId={categoryId}
                        findList={findPage}
                    />
                </Menu.Item>
                <Menu.Item key={"web-perf-add"}>
                    <WebPerfEdit
                        name={"添加压测用例"}
                        isCategory={true}
                        categoryId={categoryId}
                        findList={findPage}
                    />
                </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu title="APP添加" key={"app-add"}>
                <Menu.Item key={"app-unit-add"}>
                    <AppUnitEdit
                        name={"添加Unit用例"}
                        isCategory={true}
                        categoryId={categoryId}
                        findList={findPage}
                    />
                </Menu.Item>
                <Menu.Item key={"app-scene-add"}>
                    <AppSceneEdit
                        name={"添加场景用例"}
                        isCategory={true}
                        categoryId={categoryId}
                        findList={findPage}
                    />
                </Menu.Item>
                <Menu.Item key={"app-perf-add"}>
                    <AppPerfEdit
                        name={"添加压测用例"}
                        isCategory={true}
                        categoryId={categoryId}
                        findList={findPage}
                    />
                </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu title="功能添加" key={"func-add"}>
                <Menu.Item key={"func-unit-add"}>
                    <FuncUnitEdit
                        name={"添加Unit用例"}
                        isCategory={true}
                        categoryId={categoryId}
                        findList={findPage}
                    />
                </Menu.Item>
                <Menu.Item key={"func-scene-add"}>
                    <FuncSceneEdit
                        name={"添加场景用例"}
                        isCategory={true}
                        categoryId={categoryId}
                        findList={findPage}
                    />
                </Menu.Item>
            </Menu.SubMenu>
        </Menu>
    )
    return(
        <div className={"testcase-box"}>

            <div  className={"header-box-space-between"} >
                <div className={'header-box-title'}>用例列表</div>
                <Dropdown overlay={addMenu} placement="bottom">
                    <Button className={"important-btn"}>添加用例</Button>
                </Dropdown>
            </div>

            <div className={"dynamic-select-box"}>
                <div className={"ws-header-menu-left"}>
                    {showMenu(items)}
                </div>
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
                            value: 'unit',
                            label: '单元用例',
                        },
                        {
                            value: 'scene',
                            label: '场景用例',
                        },{
                            value: 'perform',
                            label: '性能用例',
                        },
                    ]}
                />


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
                            imageStyle={{
                                height: 120,
                            }}
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