/**
 * @description：
 * @date: 2021-08-16 15:01
 */
import React, {useEffect, useState} from "react";
import {Popconfirm, Space, Table} from 'antd';
import {inject, observer} from "mobx-react";
import TestResult from "./testResult";
import {findApiInstanceById} from "../api/testInstanceApi";

const PassFailed = (props) => {
    const {testInstanceStore,testReportId} = props;

    const { findApiInstanceById } = testInstanceStore;

    const columns = [
        {
            title:`名称`,
            dataIndex: ["step","name"],
            key: "name",
            align:"center",
        },
        {
            title:`测试结果`,
            dataIndex: "result",
            key: "result",
            align:"center",
        },
        {
            title: `路径`,
            dataIndex: ["step","path"],
            key: "path",
            align:"center",
        },
        {
            title: `操作`,
            dataIndex: "action",
            key: "action",
            align:"center",
            render: (text,record) =>(
                <Space size="middle">
                    <TestResult Id={record.step.id} name={'查看'}/>
                </Space>
            )
        },
    ]
    const [dataSource,setDataSource] = useState([])

    useEffect(() => {
        findApiInstanceById(testReportId).then(res=>setDataSource(res))
    },[testReportId])

    return(
        <Table
            columns={columns}
            dataSource={dataSource}
            rowKey={record => record.id}
            pagination={false}
        />
    )
}

export default inject('testInstanceStore')(observer(PassFailed));
