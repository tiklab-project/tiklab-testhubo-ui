import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import {Popconfirm, Space, Table} from "antd";
import TestPlanTestcaseAdd from "./testPlanBindCaseModal";
import IconCommon from "../../common/iconCommon";
import {showCaseTypeView, showTestTypeView} from "../../common/caseCommon/caseCommonFn";

const TestPlanBindCaseList = (props) =>{
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
            render:(text,record)=>(showTestTypeView(record.testCase?.testType))
        },
        {
            title:`用例类型`,
            dataIndex:["testCase","caseType"],
            key: "type",
            render:(text,record)=>(showCaseTypeView(record.testCase?.caseType))
        },
        // {
        //     title:`状态`,
        //     dataIndex:"status",
        //     key: "status",
        //     render:(text)=>(showStatus(text))
        // },
        {
            title: `操作`,
            key: "action",
            width: 150,
            render: (text, record) => (
                <Space size="middle">
                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() =>deleteTestPlanDetail(record.id).then(()=> findBindTestCaseList(testPlanId))}
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

    const showStatus = (text) =>{
        switch (text) {
            case 0:
                return "失败"
            case 1:
                return "通过"
            case 2:
                return "未执行"
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

export default inject('testPlanDetailStore')(observer(TestPlanBindCaseList));