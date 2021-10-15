/**
 * @description：
 * @date: 2021-08-19 18:07
 */
import React, {useEffect} from "react";
import {Button, Popconfirm, Space, Table} from "antd";
import {inject, observer} from "mobx-react";
import QuartzTestcaseAdd from "./quartzTestcaseAdd";

const QuartzTestcase = (props) => {
    const {quartzTestcaseStore,quartzType} = props;
    const {findQuartzTestcaseList,quartzTestcaseList,deleteQuartzTestcase} = quartzTestcaseStore;
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
                        onConfirm={() =>deleteQuartzTestcase(record.id)}
                        okText='确定'
                        cancelText='取消'
                    >
                        <a href="#" style={{color:'red'}}>删除</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ]

    const quartzMasterId = localStorage.getItem('quartzMasterId')

    useEffect(()=>{
        findQuartzTestcaseList(quartzMasterId)
    },[])

    return(
        <>
            <div className={'test-add'}>
                <QuartzTestcaseAdd quartzType={quartzType}/>
            </div>

            <Table
                className="tablelist"
                columns={columns}
                dataSource={quartzTestcaseList}
                rowKey={record => record.id}
            />
        </>

    )
}
export default inject('quartzTestcaseStore')(observer(QuartzTestcase));
