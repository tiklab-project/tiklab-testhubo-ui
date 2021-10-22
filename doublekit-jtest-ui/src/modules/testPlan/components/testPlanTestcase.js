import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import {Popconfirm, Space, Table} from "antd";
import TestPlanTestcaseAdd from "./testPlanTestcaseAdd";

const TestPlanTestcase = (props) =>{
    const {testPlanDetailStore} = props;
    const {findReleTestCase,testPlanDetailList,deleteTestPlanDetail} = testPlanDetailStore;
    //列表头
    const columns = [
        {
            title:`名称`,
            dataIndex: ["testCase","name"],
            key: "name",
            align:"center",
        },
        {
            title:`类型`,
            dataIndex:["testCase","type"],
            key: "type",
            align:"center",
        },
        {
            title: `创建人`,
            dataIndex:["testCase",'user', 'name'],
            key: "user",
            align:"center",
        },
        {
            title: `描述`,
            dataIndex: ["testCase","desc"],
            key: "desc",
            align:"center",
        },
        {
            title: `操作`,
            key: "action",
            align:"center",
            render: (text, record) => (
                <Space size="middle">
                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() =>deleteTestPlanDetail(record.id)}
                        okText='确定'
                        cancelText='取消'
                    >
                        <a href="#" style={{color:'red'}}>删除</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ]

    const testPlanId = localStorage.getItem('testPlanId')

    useEffect(()=>{
        findReleTestCase(testPlanId)
    },[])

    return(
        <>
            <div className={'test-add'}>
                <TestPlanTestcaseAdd testPlanId={testPlanId}/>
            </div>

            <Table
                className="tablelist"
                columns={columns}
                dataSource={testPlanDetailList}
                rowKey={record => record.id}
            />
        </>

    )
}

export default inject('testPlanDetailStore')(observer(TestPlanTestcase));