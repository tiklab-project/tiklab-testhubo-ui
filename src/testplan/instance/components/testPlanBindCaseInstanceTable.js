import React, {useEffect, useState} from "react";
import {Empty, Table} from "antd";
import {observer} from "mobx-react";
import {showCaseTypeTable, showTestTypeView} from "../../../common/caseCommon/CaseCommonFn";
import ApiUnitInstanceDrawer from "../../../test/api/http/unit/components/apiUnitInstanceSinglePage";
import ApiSceneInstanceDrawer from "../../../test/api/http/scene/components/apiSceneInstanceSinglePage";
import ApiPerformInstanceDrawer from "../../../test/api/http/perf/components/ApiPerfInstanceSinglePage";
import testPlanInstanceStore from "../store/testPlanInstanceStore";
import testPlanBindCaseInstanceStore from "../store/testPlanBindCaseInstanceStore";
import PaginationCommon from "../../../common/pagination/Page";
import {CASE_TYPE} from "../../../common/dictionary/dictionary";
import ExtensionCommon from "../../../common/ExtensionCommon";
import {rowStyle} from "../../../test/testcase/components/testCaseTableFn";

const TestPlanBindCaseInstanceTable = (props) =>{
    const {WebSceneInstanceSinglePage,AppSceneInstanceSinglePage} = props
    const {
        findTestPlanBindCaseInstancePage,
        testPlanBindCaseInstanceList,
    } = testPlanBindCaseInstanceStore;

    const {findTestPlanInstance} = testPlanInstanceStore;

    const column = [
        {
            title:`名称`,
            dataIndex: "name",
            key: "name",
            width:'30%',
            render:(text,record)=>(showCaseInstance(record))
        },
        {
            title:`测试类型`,
            dataIndex: "testType",
            key: "testType",
            width:'30%',
            render:(text,record)=>(showTestTypeView(record.testType))
        },
        {
            title:`用例类型`,
            dataIndex: "caseType",
            key: "caseType",
            width:'30%',
            render:(text,record)=>(<div className={"case-table-case-type"}>{showCaseTypeTable(text)}</div>)
        },
        {
            title: '是否通过',
            width: 150,
            dataIndex: 'result',
            render: (text, record) => (
                text===1
                    ?<div className={"history-item-result isSucceed"} style={{margin:0}}>通过</div>
                    :<div className={"history-item-result isFailed"} style={{margin:0}}>未通过</div>
            )
        },
    ]

    const testPlanInstanceId = sessionStorage.getItem("testPlanInstanceId")

    const [allData, setAllData] = useState();
    const [totalPage, setTotalPage] = useState();
    const [pageSize] = useState(12);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageParam, setPageParam] = useState({
        pageParam: {
            pageSize: pageSize,
            currentPage: currentPage
        }
    })

    useEffect(async ()=>{
        let res = await findTestPlanInstance(testPlanInstanceId)

        setAllData(res)
    },[testPlanInstanceId])

    useEffect(async()=>{
        await findPage()
    },[pageParam])

    const findPage = async () => {
        let param = {
            testPlanInstanceId:testPlanInstanceId,
            ...pageParam
        }
        let res = await findTestPlanBindCaseInstancePage(param)
        if(res.code===0){
            setTotalPage(res.data.totalPage)
        }

    }


    const showCaseInstance = (record) =>{
        switch (record.caseType) {
            case CASE_TYPE.API_UNIT:
                return <ApiUnitInstanceDrawer name={record.name}  apiUnitInstanceId={record.caseInstanceId}/>
            case CASE_TYPE.API_SCENE:
                return <ApiSceneInstanceDrawer name={record.name}  apiSceneInstanceId={record.caseInstanceId}/>
            case CASE_TYPE.API_PERFORM:
                return <ApiPerformInstanceDrawer name={record.name} apiPerfInstanceId={record.caseInstanceId} />
            case CASE_TYPE.WEB_SCENE:
                return <ExtensionCommon
                    name={record.name}
                    extension={WebSceneInstanceSinglePage &&<WebSceneInstanceSinglePage name={record.name}  webSceneInstanceId={record.caseInstanceId}/>}
                />
            case CASE_TYPE.APP_SCENE:
                return<ExtensionCommon
                    extension={AppSceneInstanceSinglePage&&<AppSceneInstanceSinglePage name={record.name}  appSceneInstanceId={record.caseInstanceId} />}
                    name={record.name}
                />
        }
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


    return(
        <>
            <div className={"history-detail-all"}>
                <div className={"history-detail-all-box"}>
                    <div className={"history-detail-all-item"}>
                        <div>测试结果</div>
                        <div className={"history-detail-all-item-value"}>{allData?.result===1?"成功":"失败"}</div>
                    </div>
                    <div className={"history-detail-all-item"}>
                        <div>可执行用例</div>
                        <div className={"history-detail-all-item-value"}>{allData?.total}</div>
                    </div>
                    <div className={"history-detail-all-item"}>
                        <div>通过率</div>
                        <div className={"history-detail-all-item-value"}>{allData?.passRate}</div>
                    </div>
                    <div className={"history-detail-all-item"}>
                        <div>通过数</div>
                        <div className={"history-detail-all-item-value"}>{allData?.passNum}</div>
                    </div>
                    <div className={"history-detail-all-item"}>
                        <div>失败率</div>
                        <div className={"history-detail-all-item-value"}>{allData?.errorRate}</div>
                    </div>
                    <div className={"history-detail-all-item"}>
                        <div>失败数</div>
                        <div className={"history-detail-all-item-value"}>{allData?.failNum}</div>
                    </div>
                </div>
            </div>

            <div className={"table-list-box"}>
                <Table
                    columns={column}
                    dataSource={testPlanBindCaseInstanceList}
                    rowKey = {record => record.id}
                    pagination={false}
                    onRow={(record) => ({style: rowStyle(record.caseType)})}
                    locale={{
                        emptyText: <Empty
                            imageStyle={{height: 100 }}
                            description={<span>暂无历史</span>}
                        />,
                    }}
                />
                <PaginationCommon
                    currentPage={currentPage}
                    totalPage={totalPage}
                    changePage={onTableChange}
                />
            </div>
        </>

    )
}

export default observer(TestPlanBindCaseInstanceTable);