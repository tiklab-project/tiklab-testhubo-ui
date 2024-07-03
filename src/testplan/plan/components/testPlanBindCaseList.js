import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {Empty, Input,  Space, Table} from "antd";
import {showCaseTypeTable, showCaseTypeView, showStatus} from "../../../common/caseCommon/CaseCommonFn";
import emptyImg from "../../../assets/img/empty.png";
import testPlanDetailStore from "../store/testPlanDetailStore";
import TestPlanBindCase from "./testPlanBindCaseModal";
import PaginationCommon from "../../../common/pagination/Page";
import {useHistory} from "react-router";
import TestPlanENVModal from "./testPlanENVModal";
import TestPlanExecuteTestDrawer from "./testPlanExecuteTestDrawer";
import {SearchOutlined} from "@ant-design/icons";
import MenuSelect from "../../../common/menuSelect/MenuSelect";
import CaseTypeSelect from "../../../test/testcase/components/CaseTypeSelect";
import {CASE_TYPE} from "../../../common/dictionary/dictionary";
import ExtensionCommon from "../../../common/ExtensionCommon";
import {getVersionInfo} from "thoughtware-core-ui";
import {rowStyle, showCreateUser, ShowDeleteView} from "../../../test/testcase/components/testCaseTableFn";

const TestPlanBindCaseList = (props) =>{
    const {findBindTestCasePage,testPlanDetailList,deleteTestPlanDetail,findTestCasePage,getTestTypeNum} = testPlanDetailStore;

    //列表头
    const columns = [
        {
            title:`名称`,
            dataIndex: "name",
            key: "name",
            width:"30%",
            render: (text,record) =>(
                <div className={"display-flex-gap"}>
                    <>{showCaseTypeView(record.caseType)}</>
                    {switchCaseTypeView(record)}
                </div>
            )
        },
        {
            title:`用例类型`,
            dataIndex:"caseType",
            key: "type",
            width:"10%",
            render: (text) =>(<div className={"case-table-case-type"}>{showCaseTypeTable(text)}</div>)
        },{
            title: `状态`,
            dataIndex: "status",
            key: "status",
            width:"10%",
            render:(text,record)=><div className={"case-table-status"}>{showStatus(text)}</div>
        },
        {
            title: `模块`,
            dataIndex: ["category","name"],
            key: "category",
            width:"15%",
        },{
            title: `创建人`,
            dataIndex:  ["createUser"],
            key: "user",
            width:"15%",
            render: (text, record) => (showCreateUser(record.createUser))
        },
        {
            title: `创建时间`,
            dataIndex:  ["createTime"],
            key: "createTime",
            width:"15%",
        },
        {
            title: `操作`,
            key: "action",
            width: 150,
            render: (text, record) => (
                <ShowDeleteView record={record} deleteFn={deleteFn} />
            ),
        },
    ]

    const repositoryId = sessionStorage.getItem("repositoryId")
    const testPlanId = sessionStorage.getItem('testPlanId')
    const testPlanType = localStorage.getItem('testPlanType')
    const history = useHistory();
    const [tableLoading,setTableLoading] = useState(true);
    const [totalPage, setTotalPage] = useState();
    const [selectItem, setSelectItem] = useState("all");
    const [pageSize] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageParam, setPageParam] = useState({
        pageParam: {
            pageSize: pageSize,
            currentPage: currentPage
        }
    })

    const [diffTestTypeNum, setDiffTestTypeNum] = useState();

    useEffect(()=>{
        findPage()
    },[pageParam,testPlanId])

    useEffect(async ()=>{
        let info = await getTestTypeNum(testPlanId)
        setDiffTestTypeNum(info)
    },[])

    const findPage = (params) =>{
        const param = {
            repositoryId:repositoryId,
            testPlanId:testPlanId,
            ...pageParam,
            ...params
        }
        findBindTestCasePage(param).then((res)=>{
            setTotalPage(res.totalPage)
            setTableLoading(false)
        })
    }

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

    //删除
    const deleteFn=(record) => {
        deleteTestPlanDetail(record.planCaseId).then(async () => {
            findPage()
            let param = {
                pageParam: {
                    pageSize: 20,
                    currentPage: 1
                },
                repositoryId: repositoryId,
                testPlanId: testPlanId,
            }
            await findTestCasePage(param)
        })
    }


    //再根据不同的用例类型跳到不同的页面
    const switchCaseTypeView = (record) =>{
        const toDiffCase = (record)=>{
            switch (record.caseType) {
                case "function":
                    toDetailAddRouterCommon("functionId",record)
                    break

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

                case "app-scene":
                    toDetailAddRouterCommon("appSceneId",record)
                    break;
            }
        }


        //跳转路由
        const toDetailAddRouterCommon = (setId,record)=>{
            sessionStorage.setItem(`${setId}`,record.id);
            history.push(`/plan/plan-to-${record.caseType}`)
        }


        switch (record.caseType) {
            case CASE_TYPE.FUNCTION:
            case CASE_TYPE.API_UNIT:
            case CASE_TYPE.API_SCENE:
            case CASE_TYPE.API_PERFORM:
                return <span className={"link-text"}  onClick={()=>toDiffCase(record)}>{record.name}</span>
            case CASE_TYPE.WEB_SCENE:
            case CASE_TYPE.APP_SCENE:
                if(getVersionInfo().expired===false){
                    return <span className={"link-text"}  onClick={()=>toDiffCase(record)}>{record.name}</span>
                }else {
                    return <ExtensionCommon name={record.name} />
                }
            default:
                return null
        }
    }


    //搜索
    const onSearch = (e) =>{
        setCurrentPage(1)
        let param = {name: e.target.value}

        findPage(param)
    }


    const autoTypeMenu = [
        {
            title: `所有 (${diffTestTypeNum?.all||0})`,
            key: `all`,
        },
        {
            title: `接口 (${diffTestTypeNum?.api||0})`,
            key: `api`,
        },
        {
            title: `UI (${diffTestTypeNum?.ui||0})`,
            key: `ui`,
        },
    ];


    const functionTypeMenu=[
        {
            title: `所有 (${diffTestTypeNum?.all||0})`,
            key: `all`,
        },
        {
            title: `功能 (${diffTestTypeNum?.function||0})`,
            key: `function`,
        },
    ]


    //点击测试类型筛选项查找
    const selectKeyFun = (item)=>{
        let key = item.key
        setSelectItem(key)

        let param
        if(key!=="all"){
            param={testType:key}
        }

        findPage(param)
    }

    const caseSelectPage = (value) =>{
        let param = {
            testType:selectItem,
            caseTypeList:value
        }

        findPage(param)
    }


    return(
        <div className={"content-box-center"}>
            <div className='header-box-space-between'>
                <div className={'header-box-title'}>测试用例</div>
                <Space>
                    {
                        testPlanType==="auto"
                            &&<>
                                <TestPlanENVModal {...props}/>
                                <TestPlanExecuteTestDrawer testPlanId={testPlanId} />
                            </>
                    }
                    <TestPlanBindCase
                        testPlanId={testPlanId}
                        findBindCasePage={findPage}
                    />
                </Space>
            </div>
            <div style={{margin:"10px 0",height:"100%"}}>
                <div className='display-flex-between'>
                    <MenuSelect
                        menuItems={testPlanType==="auto"?autoTypeMenu:functionTypeMenu}
                        selectFn={selectKeyFun}
                        selected={selectItem}
                        style={{width: `${testPlanType==="auto"?"240px":"160px"}`}}
                    />

                    <Space>
                        {
                            selectItem==="api"||selectItem==="ui"
                                ?<CaseTypeSelect findPage={caseSelectPage} testType={selectItem}/>
                                :null
                        }
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
                        className="tablelist"
                        columns={columns}
                        dataSource={testPlanDetailList}
                        rowKey={record => record.id}
                        pagination={false}
                        loading={tableLoading}
                        onRow={(record) => ({style: rowStyle(record.caseType)})}
                        locale={{
                            emptyText: <Empty
                                imageStyle={{height: 120}}
                                description={<span>暂无用例</span>}
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
        </div>
    )
}



export default inject("testPlanStore")(observer(TestPlanBindCaseList));