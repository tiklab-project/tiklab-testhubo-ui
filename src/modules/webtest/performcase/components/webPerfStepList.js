import React, {useEffect} from "react";
import {Popconfirm, Space, Switch, Table} from "antd";
import WebPerformBindScene from "./webPerformBindScene";
import {inject, observer} from "mobx-react";
import IconCommon from "../../../common/iconCommon";

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
            width: "120",
            render: (text, record) => (
                <Popconfirm
                    title="确定删除？"
                    onConfirm={() => deleteWebPerfStep(record.id).then(()=> findWebPerfStepList(webPerfId))}
                    okText='确定'
                    cancelText='取消'
                >
                    <IconCommon
                        className={"icon-s edit-icon"}
                        icon={"shanchu3"}
                    />
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
            <div className='title-space-between'>
                <WebPerformBindScene
                    webPerfStepStore={webPerfStepStore}
                    webPerfId={webPerfId}
                />
            </div>
            <div className={"table-list-box"}>
                <Table
                    columns={column}
                    dataSource={webPerfStepList}
                    rowKey = {record => record.id}
                    pagination={false}
                />
            </div>
        </>
    )
}

export default inject("webPerfStepStore")(observer(WebPerfStep));