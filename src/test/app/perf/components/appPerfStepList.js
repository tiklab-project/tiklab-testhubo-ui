import React, {useEffect} from "react";
import {Popconfirm, Table} from "antd";
import AppPerformBindScene from "./appPerformBindScene";
import {inject, observer} from "mobx-react";
import IconCommon from "../../../../common/IconCommon";
import appPerfStepStore from "../store/appPerfStepStore";

const AppPerfStepList = (props) =>{
    const {findAppPerfStepList,appPerfStepList,deleteAppPerfStep} =appPerfStepStore;


    const column =[
        {
            title: '场景名称',
            dataIndex: ["appScene",'testCase','name'],
            key: 'name',
            render: (text, record) => (
                props.type ? <a onClick={() => setSessionStorage(record.appScene.id)}>{text}</a>:<span>{text}</span>
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
            width: 120,
            render: (text, record) => (
                <Popconfirm
                    title="确定删除？"
                    onConfirm={() => deleteAppPerfStep(record.id).then(()=>findAppPerfStepList(appPerfId))}
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

    let appPerfId = sessionStorage.getItem("appPerfId")

    useEffect(()=>{
        findAppPerfStepList(appPerfId)
    },[appPerfId])

    const setSessionStorage = (id) =>{
        sessionStorage.setItem("appSceneId",id);
        props.history.push("/repository/app-perform-to-scene")
    }


    return(
        <>
            <div className='title-space-between'>
                <AppPerformBindScene
                    appPerfStepStore={appPerfStepStore}
                    appPerfId={appPerfId}
                />
            </div>
            <div className={"table-list-box"}>
                <Table
                    columns={column}
                    dataSource={appPerfStepList}
                    rowKey = {record => record.id}
                    pagination={false}
                />
            </div>
        </>
    )
}

export default observer(AppPerfStepList);