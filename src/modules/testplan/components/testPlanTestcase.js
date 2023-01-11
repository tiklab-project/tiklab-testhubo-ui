import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import {Popconfirm, Select, Space, Table} from "antd";
import TestPlanTestcaseAdd from "./testPlanTestcaseAdd";

const {Option} = Select;
const TestPlanTestcase = (props) =>{
    const {testPlanDetailStore} = props;
    const {findBindTestCaseList,testPlanDetailList,deleteTestPlanDetail,updateTestPlanDetail} = testPlanDetailStore;
    //列表头
    const columns = [
        {
            title:`名称`,
            dataIndex: ["testCase","name"],
            key: "name",
        },
        {
            title:`测试类型`,
            dataIndex:["testCase","testType"],
            key: "type",
            render:(text,record)=>(showTestType(record.testCase?.testType))
        },
        {
            title:`用例类型`,
            dataIndex:["testCase","caseType"],
            key: "type",
            render:(text,record)=>(showCaseType(record.testCase?.caseType))
        },
        {
            title:`状态`,
            dataIndex:"status",
            key: "status",
            render:(text,record)=>(
                <Select defaultValue={text} onChange={(e)=>changeStatus(e,record)}>
                    <Option value={0}>失败</Option>
                    <Option value={1}>通过</Option>
                    <Option value={2}>未执行</Option>
                </Select>
            )
        },
        {
            title: `操作`,
            key: "action",
            render: (text, record) => (
                <Space size="middle">
                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() =>deleteTestPlanDetail(record.id).then(()=> findBindTestCaseList(testPlanId))}
                        okText='确定'
                        cancelText='取消'
                    >
                        <a href="#" style={{color:'red'}}>删除</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ]

    const testPlanId = sessionStorage.getItem('testPlanId')

    useEffect(()=>{
        findBindTestCaseList(testPlanId)
    },[testPlanId])

    const changeStatus = (data,record)=>{
        let params = {
            id:record.id,
            status:data
        }

        updateTestPlanDetail(params)
    }

    const showTestType = (testType)=>{
        switch (testType) {
            case "api":
                return "API";
            case "web":
                return "WEB";
            case "app":
                return "APP";
            case "func":
                return "功能";
        }
    }

    const showCaseType = (caseType)=>{
        switch (caseType) {
            case "unit":
                return "单元测试";
            case "scene":
                return "场景测试";
            case "perform":
                return "压力测试";
        }
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
                    pagination={false}
                />
            </div>

        </>

    )
}

export default inject('testPlanDetailStore')(observer(TestPlanTestcase));