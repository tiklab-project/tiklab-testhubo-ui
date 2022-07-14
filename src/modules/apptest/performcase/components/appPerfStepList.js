import React, {useEffect} from "react";
import {Popconfirm, Table} from "antd";
import AppPerformBindScene from "./appPerformBindScene";
import {inject, observer} from "mobx-react";

const AppPerfStepList = (props) =>{
    const {appPerfStepStore} = props;
    const {findAppPerfStepList,appPerfStepList,deleteAppPerfStep} =appPerfStepStore;


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
                    onConfirm={() => deleteAppPerfStep(record.id).then(()=>findAppPerfStepList(appPerfId))}
                    okText='确定'
                    cancelText='取消'
                >
                    <a className="table-delete"> 删除 </a>
                </Popconfirm>
            )
        },
    ]

    let appPerfId = sessionStorage.getItem("appPerfId")

    useEffect(()=>{
        findAppPerfStepList(appPerfId)
    },[appPerfId])


    return(
        <>

            <AppPerformBindScene
                appPerfStepStore={appPerfStepStore}
                appPerfId={appPerfId}
            />

            <Table
                columns={column}
                dataSource={appPerfStepList}
                rowKey = {record => record.id}
                pagination={false}
            />
        </>
    )
}

export default inject("appPerfStepStore")(observer(AppPerfStepList));