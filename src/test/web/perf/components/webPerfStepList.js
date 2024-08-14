import React, {useEffect} from "react";
import {Popconfirm, Table} from "antd";
import WebPerformBindScene from "./webPerformBindScene";
import {inject, observer} from "mobx-react";
import IconCommon from "../../../../common/IconCommon";
import webPerfStepStore from "../store/webPerfStepStore";

const WebPerfStep = (props) =>{
    const {findWebPerfStepList,webPerfStepList,deleteWebPerfStep} =webPerfStepStore;


    const column =[
        {
            title: '场景名称',
            dataIndex: ["webScene",'testCase','name'],
            key: 'name',
            render: (text, record) => (
                props.type ? <a onClick={() => setSessionStorage(record.webScene.id)}>{text}</a>:<span>{text}</span>
            )
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

    const setSessionStorage = (id) =>{
        sessionStorage.setItem("webSceneId",id);
        props.history.push("/project/web-perform-to-scene")
    }

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

export default observer(WebPerfStep);