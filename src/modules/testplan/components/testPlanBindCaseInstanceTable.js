import React, {useEffect, useState} from "react";
import {Empty, Space, Table} from "antd";
import {inject, observer} from "mobx-react";
import emptyImg from "../../../assets/img/empty.png";
import {showCaseTypeView, showTestTypeView} from "../../common/caseCommon/caseCommonFn";
import ApiUnitInstanceDrawer from "../../apitest/http/unitcase/components/apiUnitInstanceDrawer";
import ApiSceneInstanceDrawer from "../../apitest/http/scenecase/components/apiSceneInstanceDrawer";
import WebSceneInstanceDrawer from "../../webtest/scenecase/components/webSceneInstanceDrawer";
import AppSceneInstanceDrawer from "../../apptest/scenecase/components/appSceneInstanceDrawer";

const TestPlanBindCaseInstanceTable = (props) =>{
    const {testPlanBindCaseInstanceStore} = props;
    const {
        findTestPlanBindCaseInstancePage,
        testPlanBindCaseInstanceList,
    } = testPlanBindCaseInstanceStore;

    const column = [
        {
            title:`名称`,
            dataIndex: "name",
            key: "name",
            width:'25%'
        },
        {
            title:`测试类型`,
            dataIndex: "testType",
            key: "testType",
            width:'25%',
            render:(text,record)=>(showTestTypeView(record.testType))
        },
        {
            title:`用例类型`,
            dataIndex: "caseType",
            key: "caseType",
            width:'25%',
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
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            width: 120,
            render: (text, record) => (
                <Space size="middle">
                    {showCaseInstance(record)}

                </Space>
            )
        },
    ]

    const testPlanInstanceId = sessionStorage.getItem("testPlanInstanceId")
    const [totalRecord, setTotalRecord] = useState();
    const [pageSize] = useState(12);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageParam, setPageParam] = useState({
        pageParam: {
            pageSize: pageSize,
            currentPage: currentPage
        }
    })


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
                return <ApiUnitInstanceDrawer icon={true} apiUnitInstanceId={record.caseInstanceId}/>
            case "api-scene":
                return <ApiSceneInstanceDrawer icon={true}  apiSceneInstanceId={record.caseInstanceId}/>
            case "web-scene":
                return <WebSceneInstanceDrawer icon={true}  webSceneInstanceId={record.caseInstanceId}/>
            case "app-scene":
                return <AppSceneInstanceDrawer icon={true}  appSceneInstanceId={record.caseInstanceId}/>
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
    )
}

export default inject("testPlanBindCaseInstanceStore")(observer(TestPlanBindCaseInstanceTable));