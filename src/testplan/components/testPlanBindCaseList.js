import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {Empty, Popconfirm, Space, Table} from "antd";
import TestPlanTestcaseAdd from "./testPlanBindCaseModal";
import IconCommon from "../../common/IconCommon";
import {showCaseTypeView, showTestTypeView} from "../../common/caseCommon/CaseCommonFn";
import emptyImg from "../../assets/img/empty.png";
import testPlanDetailStore from "../store/testPlanDetailStore";

const TestPlanBindCaseList = (props) =>{
    const {findBindTestCaseList,testPlanDetailList,deleteTestPlanDetail} = testPlanDetailStore;
    //列表头
    const columns = [
        {
            title:`名称`,
            dataIndex: ["testCase","name"],
            key: "name",
            render:(text,record)=>(<a onClick={()=>toDiffCase(record.testCase)}>{text}</a>)
        },
        {
            title:`测试类型`,
            dataIndex:["testCase","testType"],
            key: "type",
            render:(text,record)=>(showTestTypeView(record.testCase?.testType))
        },
        {
            title:`用例类型`,
            dataIndex:["testCase","caseType"],
            key: "type",
            render:(text,record)=>(showCaseTypeView(record.testCase?.caseType))
        },
        {
            title: `操作`,
            key: "action",
            width: 150,
            render: (text, record) => (
                <Space size="middle">
                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() =>deleteTestPlanDetail(record.id).then(()=> findPage())}
                        okText='确定'
                        cancelText='取消'
                    >
                        <IconCommon
                            className={"icon-s edit-icon"}
                            icon={"shanchu3"}
                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ]

    const testPlanId = sessionStorage.getItem('testPlanId')

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

    const findPage = () =>{
        const param = {
            testPlanId:testPlanId,
            ...pageParam
        }
        findBindTestCaseList(param).then((res)=>{
            setTotalRecord(res.totalRecord)
        })
    }


    const toDiffCase = (record) =>{
        switch (record.testType) {
            case "api":
            case "ui":
            case "perform":
                switchCaseType(record);
                break;
            case "function":
                sessionStorage.setItem(`funcUnitId`,record.id);
                props.history.push(`/repository/plan-function`)
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
        props.history.push(`/repository/plan-${record.caseType}`)
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

            <div className='title-space-between'>
                <div className={'test-title'}>
                    <div>关联用例</div>
                </div>
                <TestPlanTestcaseAdd testPlanId={testPlanId}/>
            </div>

            <div className={"table-list-box"}>
                <Table
                    className="tablelist"
                    columns={columns}
                    dataSource={testPlanDetailList}
                    rowKey={record => record.id}
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

        </>

    )
}

export default observer(TestPlanBindCaseList);