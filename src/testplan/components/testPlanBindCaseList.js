import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {Empty, Popconfirm, Space, Table} from "antd";
import IconCommon from "../../common/IconCommon";
import {showCaseTypeInList, showTestTypeView} from "../../common/caseCommon/CaseCommonFn";
import emptyImg from "../../assets/img/empty.png";
import testPlanDetailStore from "../store/testPlanDetailStore";
import IconBtn from "../../common/iconBtn/IconBtn";
import TestPlanBindCase from "./testPlanBindCase";
import TestPlanBindCaseDrawer from "./TestPlanBindCaseDrawer";

const TestPlanBindCaseList = (props) =>{
    const {testcaseStore} = props
    const {findBindTestCaseList,testPlanDetailList,deleteTestPlanDetail} = testPlanDetailStore;
    const {findTestCaseList} = testcaseStore;
    //列表头
    const columns = [
        {
            title:`名称`,
            dataIndex: ["testCase","name"],
            key: "name",
            render:(text,record)=>(
                <TestPlanBindCaseDrawer
                    caseData={record.testCase}
                    testPlanId={testPlanId}
                    {...props}
                />
            )
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
            render:(text,record)=>(showCaseTypeInList(record.testCase?.caseType))
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

    let repositoryId = sessionStorage.getItem("repositoryId")
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

    const [visible, setVisible] = useState(false);
    const showConnect =()=>{
        findTestCaseList({repositoryId:repositoryId})
        setVisible(true);
    }


    return(
        <div style={{margin:"10px 0",height:"100%"}}>
            <div className={`${visible?"teston-hide":"teston-show"}`} >
                <div className='title-space-between'>
                    <div className={'test-title'}>
                        <div>关联用例</div>
                    </div>
                    <IconBtn
                        className="pi-icon-btn-grey"
                        name={"关联用例"}
                        onClick={showConnect}
                    />
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
            </div>
            <div className={`case-bind_box ${visible?"teston-show":"teston-hide"}`}>
                <TestPlanBindCase
                    setVisible={setVisible}
                    testPlanId={testPlanId}
                />
            </div>
        </div>

    )
}

export default inject("testcaseStore")(observer(TestPlanBindCaseList));