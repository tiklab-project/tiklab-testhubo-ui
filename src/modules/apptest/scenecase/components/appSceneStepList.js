import React, {useEffect} from "react";
import {Input, Popconfirm, Space, Table} from "antd";
import {inject, observer} from "mobx-react";
import AppSceneBindUnit from "./AppSceneBindUnit";
import IconCommon from "../../../common/iconCommon";

const AppSceneStepList = (props) => {
    const {appSceneStepStore} =props;
    const {findAppSceneStepList,appSceneStepList,deleteAppSceneStep} = appSceneStepStore;

    const column = [
        {
            title:`用例名称`,
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
            width: 120,
            render: (text, record) => (
                <Space size="middle">
                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() => deleteAppSceneStep(record.id).then(()=>findAppSceneStepList(appSceneId))}
                        okText='确定'
                        cancelText='取消'
                    >
                        <IconCommon
                            className={"icon-s edit-icon"}
                            icon={"shanchu3"}
                        />
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