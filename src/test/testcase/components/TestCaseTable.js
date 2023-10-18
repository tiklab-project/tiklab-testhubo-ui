import React, {useEffect, useState} from "react";
import {Avatar, Empty, Input, Popconfirm, Space, Table, TreeSelect} from "antd";
import {inject, observer} from "mobx-react";
import emptyImg from "../../../assets/img/empty.png"
import IconCommon from "../../../common/IconCommon";
import {showCaseTypeInList, showCaseTypeView} from "../../../common/caseCommon/CaseCommonFn";
import {SearchOutlined} from "@ant-design/icons";
import CaseTypeSelect from "./CaseTypeSelect";
import {useHistory} from "react-router";
import DropdownAdd from "./DropdownAdd";
import "./testcaseStyle.scss"
import "./caseContantStyle.scss"
import "./unitcase.scss"
import TestCaseMenu from "./TestCaseMenu";
import {getUser} from "tiklab-core-ui";
import CaseInstanceSingleDrawer from "../../common/CaseInstanceSingleDrawer";
import {CASE_TYPE} from "../../common/DefineVariables";

const TestCaseTable = (props) => {
    const {testcaseStore,categoryStore} = props;
    const {findCategoryListTreeTable,categoryTableList} = categoryStore;
    const {
        findTestCaseList,
        testcaseList,
        deleteTestCase,
        testType,
        setTestType,
        testCaseRecent
    }=testcaseStore;


    const column = [
        {
            title:`名称`,
            dataIndex: 'name',
            key: "name",
            width:"30%",
            render: (text,record) =>(
                <Space className={"case-table-name"}>
                    <>{showCaseTypeView(record.caseType)}</>
                    <a onClick={()=>switchCaseType(record)}>{text}</a>
                </Space>
            )
        },
        {
            title: `用例类型`,
            dataIndex: "caseType",
            key: "caseType",
            width:"10%",
            render: (text) =>(showCaseTypeInList(text))
        },
        {
            title: `最近执行`,
            dataIndex: "recentInstance",
            key: "recentInstance",
            width:"10%",
            render:(text,record)=>(<CaseInstanceSingleDrawer caseData={record} {...props}/>)
        },
        {
            title: `模块`,
            dataIndex: ["category","name"],
            key: "category",
            width:"10%",
        },
        {
            title: `创建人`,
            dataIndex:  ["createUser","name"],
            key: "user",
            width:"15%",
            render: (text, record) => (showCreateUser(record.createUser))
        },
        {
            title: `创建时间`,
            dataIndex: 'createTime',
            key: "createTime",
            width:"15%",
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            width: 100,
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
    let repositoryId = sessionStorage.getItem("repositoryId")

    let history = useHistory();

    useEffect(()=>{
        findPage()
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

    const showCreateUser = (createUser) =>{
        if(createUser&&createUser.nickname){
            return <div className={"ws-user-item"}>
                <Space>
                    <Avatar size={"small"}>{createUser?.nickname[0]}</Avatar>
                    <span style={{fontSize:"13px"}}>{createUser?.nickname} </span>
                </Space>
            </div>
        }
    }

    //模块赛选
    const changeCategory=(categoryId)=> {
        setSelectCategory(categoryId)

        let param = {categoryId:categoryId}
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

    //再根据不同的用例类型跳到不同的页面
    const switchCaseType = (record)=>{
        switch (record.caseType) {
            case CASE_TYPE.API_UNIT:
                toCaseDetail("apiUnitId",record)
                break;
            case CASE_TYPE.API_SCENE:
                toCaseDetail("apiSceneId",record)
                break;
            case CASE_TYPE.API_PERFORM:
                toCaseDetail("apiPerfId",record)
                break;
            case CASE_TYPE.WEB_SCENE:
                toCaseDetail("webSceneId",record)
                break;
            case CASE_TYPE.WEB_PERFORM:
                toCaseDetail("webPerfId",record)
                break;
            case CASE_TYPE.APP_SCENE:
                toCaseDetail("appSceneId",record)
                break;
            case CASE_TYPE.APP_PERFORM:
                toCaseDetail("appPerfId",record)
                break;
            case CASE_TYPE.FUNCTION:
                toCaseDetail("functionId",record)
                break;
        }
    }

    //跳转路由
    const toCaseDetail = (setId,record)=>{
        sessionStorage.setItem(`${setId}`,record.id);
        history.push(`/repository/${record.caseType}/${record.id}`)

        //最近访问
        let params = {
            repository:{id:repositoryId},
            user:{id:getUser().userId},
            testCase:{id:record.id},
        }
        testCaseRecent(params)
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