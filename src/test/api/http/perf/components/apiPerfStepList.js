import React, {useEffect, useState} from "react";
import {Popconfirm, Table} from "antd";
import { observer} from "mobx-react";
import IconCommon from "../../../../../common/IconCommon";
import apiPerfStepStore from "../store/apiPerfStepStore";
import {useHistory} from "react-router";
import IconBtn from "../../../../../common/iconBtn/IconBtn";
import ApiPerformBindScene from "./apiPerformBindScene";

const ApiPerfStepList = (props) =>{
    const {apiPerfId} = props
    const {findApiPerfStepList,apiPerfStepList,deleteApiPerfStep} =apiPerfStepStore;


    const column =[
        {
            title: '场景名称',
            dataIndex: ["apiScene",'testCase','name'],
            key: 'name',
            width: "30%",
            render: (text, record) => (
                props.type ? <a onClick={() => setSessionStorage(record.apiScene.id)}>{text}</a>:<span>{text}</span>
            )
        },
        {
            title: `创建时间`,
            dataIndex:'createTime',
            key: "createTime",
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            width: "15%",
            render: (text, record) => (
                <Popconfirm
                    title="确定删除？"
                    onConfirm={() => deleteApiPerfStep(record.id).then(()=>findApiPerfStepList(apiPerfId))}
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

    let history = useHistory()
    useEffect(async ()=>{
        await findApiPerfStepList(apiPerfId)
    },[apiPerfId])

    const setSessionStorage = (id) =>{
        sessionStorage.setItem("apiSceneId",id);
        history.push("/repository/api-perform-to-scene")
    }

    return(
        <div style={{margin:"10px 0",height:"100%"}}>
            <ApiPerformBindScene />
            <div className={"table-list-box"}>
            <Table
                columns={column}
                dataSource={apiPerfStepList}
                rowKey = {record => record.id}
                pagination={false}
            />
            </div>
        </div>
    )
}

export default observer(ApiPerfStepList);