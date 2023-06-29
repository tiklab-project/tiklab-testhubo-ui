import React, {useEffect} from "react";
import {Popconfirm, Space, Switch, Table} from "antd";
import ApiPerformBindScene from "./apiPerformBindScene";
import {inject, observer} from "mobx-react";
import IconCommon from "../../../../../common/IconCommon";
import apiPerfStepStore from "../store/apiPerfStepStore";

const ApiPerfStepList = (props) =>{
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

    const apiPerfId = sessionStorage.getItem("apiPerfId")

    useEffect(()=>{
        findApiPerfStepList(apiPerfId)
    },[])


    // const changeEnable = (e,record) => {
        // if(e===true){
        //     record.enable=1;
        // }else {
        //     record.enable=0;
        // }
        // updateMock(record)
    // }

    const setSessionStorage = (id) =>{
        sessionStorage.setItem("apiSceneId",id);
        props.history.push("/repository/api-perform-to-scene")
    }

    return(
        <>
            <div className='title-space-between'>
                <ApiPerformBindScene
                    apiPerfStepStore={apiPerfStepStore}
                    apiPerfId={apiPerfId}
                />
            </div>
            <div className={"table-list-box"}>
                <Table
                    columns={column}
                    dataSource={apiPerfStepList}
                    rowKey = {record => record.id}
                    pagination={false}
                />
            </div>
        </>
    )
}

export default observer(ApiPerfStepList);