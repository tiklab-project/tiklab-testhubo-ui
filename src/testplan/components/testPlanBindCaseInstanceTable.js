import React, {useEffect, useState} from "react";
import {Empty, Space, Table} from "antd";
import {inject, observer} from "mobx-react";
import emptyImg from "../../assets/img/empty.png";
import {showCaseTypeView, showTestTypeView} from "../../common/caseCommon/CaseCommonFn";
import ApiUnitInstanceDrawer from "../../test/api/http/unit/components/apiUnitInstanceDrawer";
import ApiSceneInstanceDrawer from "../../test/api/http/scene/components/apiSceneInstanceDrawer";
import WebSceneInstanceDrawer from "../../test/web/scene/components/webSceneInstanceDrawer";
import AppSceneInstanceDrawer from "../../test/app/scene/components/appSceneInstanceDrawer";
import ApiPerformInstanceDrawer from "../../test/api/http/perf/components/apiPerformInstanceDrawer";
import WebPerformInstanceDrawer from "../../test/web/perf/components/webPerformInstanceDrawer";
import AppPerformInstanceDrawer from "../../test/app/perf/components/appPerformInstanceDrawer";

const TestPlanBindCaseInstanceTable = (props) =>{
    const {testPlanInstanceStore,testPlanBindCaseInstanceStore} = props;
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
            render:(text,record)=>(showCaseTypeView(record.caseType))
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
    const [totalRecord, setTotalRecord] = useState();
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

    useEffect(()=>{
        findPage()
    },[pageParam])

    const findPage = async () => {
        let param = {
            testPlanInstanceId:testPlanInstanceId,
            ...pageParam
        }
        let res = await findTestPlanBindCaseInstancePage(param)
        if(res.code===0){
            setTotalRecord(res.data.totalRecord)
        }

    }


    const showCaseInstance = (record) =>{
        switch (record.caseType) {
            case "api-unit":
                return <ApiUnitInstanceDrawer name={record.name}  apiUnitInstanceId={record.caseInstanceId}/>
            case "api-scene":
                return <ApiSceneInstanceDrawer name={record.name}  apiSceneInstanceId={record.caseInstanceId}/>
            case "web-scene":
                return <WebSceneInstanceDrawer name={record.name}  webSceneInstanceId={record.caseInstanceId}/>
            case "app-scene":
                return <AppSceneInstanceDrawer name={record.name}  appSceneInstanceId={record.caseInstanceId}/>

            case "api-perform":
                return <ApiPerformInstanceDrawer name={record.name} apiPerfInstanceId={record.caseInstanceId} />

            case "web-perform":
                return  <WebPerformInstanceDrawer name={record.name} webPerfInstanceId={record.caseInstanceId} />
            case "app-perform":
                return <AppPerformInstanceDrawer name={record.name} appPerfInstanceId={record.caseInstanceId} />
        }
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



    return(
        <>
            <div className={"history-detail-all"}>
                <div className={"history-detail-all-box"}>
                    <div className={"history-detail-all-item"}>
                        <div>测试结果</div>
                        <div className={"history-detail-all-item-value"}>{allData?.result===1?"成功":"失败"}</div>
                    </div>
                    <div className={"history-detail-all-item"}>
                        <div>用例数</div>
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
                    pagination={{
                        current:currentPage,
                        pageSize:pageSize,
                        total:totalRecord,
                    }}
                    onChange = {(pagination) => onTableChange(pagination)}

                    locale={{
                        emptyText: <Empty
                            imageStyle={{height: 120 }}
                            description={<span>暂无历史</span>}
                            image={emptyImg}
                        />,
                    }}
                />
            </div>
        </>

    )
}

export default inject("testPlanInstanceStore","testPlanBindCaseInstanceStore")(observer(TestPlanBindCaseInstanceTable));