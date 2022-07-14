import React, {useEffect} from "react";
import {Popconfirm, Space, Switch, Table} from "antd";
import WebPerformBindScene from "./webPerformBindScene";
import {inject, observer} from "mobx-react";

const WebPerfStep = (props) =>{
    const {webPerfStepStore} = props;
    const {findWebPerfStepList,webPerfStepList,deleteWebPerfStep} =webPerfStepStore;


    const column =[
        {
            title: '场景名称',
            dataIndex: ['testCase','name'],
            key: 'name',
        },
        {
            title: `创建时间`,
            dataIndex: 'createTime',
            key: "createTime",
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align: 'center',
            width: "15%",
            render: (text, record) => (
                <Popconfirm
                    title="确定删除？"
                    onConfirm={() => deleteWebPerfStep(record.id).then(()=> findWebPerfStepList(webPerfId))}
                    okText='确定'
                    cancelText='取消'
                >
                    <a className="table-delete"> 删除 </a>
                </Popconfirm>
            )
        },
    ]

    let webPerfId = sessionStorage.getItem("webPerfId")

    useEffect(()=>{
        findWebPerfStepList(webPerfId)
    },[webPerfId])


    return(
        <>
            <WebPerformBindScene
                webPerfStepStore={webPerfStepStore}
                webPerfId={webPerfId}
            />

            <Table
                columns={column}
                dataSource={webPerfStepList}
                rowKey = {record => record.id}
                pagination={false}
            />
        </>
    )
}

export default inject("webPerfStepStore")(observer(WebPerfStep));