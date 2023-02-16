import React, {useEffect, useState} from "react";
import {Button, Dropdown, Empty, Input, Menu, Popconfirm, Space, Table} from "antd";
import {inject, observer} from "mobx-react";
import "./testcaseStyle.scss"
import "./caseContantStyle.scss"
import emptyImg from "../../../assets/img/empty.png"
import ApiUnitEdit from "../../apitest/http/unitcase/components/apiUnitEdit";
import ApiSceneEdit from "../../apitest/http/scenecase/components/apiSceneEdit";
import ApiPerfEdit from "../../apitest/http/performcase/components/apiPerfEdit";
import WebSceneEdit from "../../webtest/scenecase/components/webSceneEdit";
import WebPerfEdit from "../../webtest/performcase/components/webPerfEdit";
import AppSceneEdit from "../../apptest/scenecase/components/appSceneEdit";
import AppPerfEdit from "../../apptest/performcase/components/appPerfEdit";
import IconCommon from "../../common/iconCommon";
import {showCaseTypeView, showTestTypeView} from "../../common/caseCommon/caseCommonFn";
import FuncUnitEdit from "../../functest/components/funcUnitEdit";
import {SearchOutlined} from "@ant-design/icons";


const TestCaseList = (props) => {
    const {testcaseStore} = props;
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
            title: `分组`,
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
        },{
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

    const findPage = (testType,caseType) =>{
        const param = {
            repositoryId:repositoryId,
            // categoryId:categoryId,
            testType:testType,
            caseType:caseType,
            ...pageParam
        }
        findTestCaseList(param).then((res)=>{
            setTotalRecord(res.totalRecord)
        })
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

                <Input
                    placeholder={`搜索用例`}
                    onPressEnter={onSearch}
                    className='search-input-common'
                    prefix={<SearchOutlined />}
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