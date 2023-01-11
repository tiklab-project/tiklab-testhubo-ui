import React, {useEffect} from "react";
import {Input, Popconfirm, Space, Table} from "antd";
import {inject, observer} from "mobx-react";
import AppSceneBindUnit from "./AppSceneBindUnit";

const AppSceneStepList = (props) => {
    const {appSceneStepStore} =props;
    const {findAppSceneStepList,appSceneStepList,deleteAppSceneStep} = appSceneStepStore;

    const column = [
        {
            title:`测试用例名称`,
            dataIndex: "name",
            key: "name",
        }, {
            title: `创建时间`,
            dataIndex: "createTime",
            key: "user",
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align: 'center',
            width: "15%",
            render: (text, record) => (
                <Space size="middle">
                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() => deleteAppSceneStep(record.id).then(()=>findAppSceneStepList(appSceneId))}
                        okText='确定'
                        cancelText='取消'
                    >
                        <a className="table-delete"> 删除 </a>
                    </Popconfirm>
                </Space>
            )
        },
    ]

    let appSceneId = sessionStorage.getItem("appSceneId")

    useEffect(()=>{
        findAppSceneStepList(appSceneId)
    },[appSceneId])

   

    return(
        <>
            <div className='title-space-between'>
                <div className={'test-title'}>
                    <div>场景步骤</div>
                </div>
               <AppSceneBindUnit
                   appSceneStepStore={appSceneStepStore}
                   appSceneId={appSceneId}
               />
            </div>
            <div className={"table-list-box"}>
                <Table
                    columns={column}
                    dataSource={appSceneStepList}
                    rowKey = {record => record.id}
                    pagination={false}
                />
            </div>
        </>
    )


}

export default inject("appSceneStepStore")(observer(AppSceneStepList))