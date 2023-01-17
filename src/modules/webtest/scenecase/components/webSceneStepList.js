import React, {useEffect} from "react";
import {Input, Popconfirm, Space, Table} from "antd";
import {inject, observer} from "mobx-react";
import WebSceneBindUnit from "./WebSceneBindUnit";
import IconCommon from "../../../common/iconCommon";

const WebSceneStepList = (props) => {
    const {webSceneStepStore} =props;
    const {findWebSceneStepList,webSceneStepList,deleteWebSceneStep} = webSceneStepStore;

    const column = [
        {
            title:`用例名称`,
            dataIndex: "name",
            key: "name",
        }, {
            title: `创建时间`,
            dataIndex: "createTime",
            key: "createTime",
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
                        onConfirm={() => deleteWebSceneStep(record.id).then(()=>findWebSceneStepList(webSceneId))}
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

    let webSceneId = sessionStorage.getItem("webSceneId")

    useEffect(()=>{
        findWebSceneStepList(webSceneId)
    },[webSceneId])

   

    return(
        <>
            <div className='title-space-between'>
                <div className={'test-title'}>
                    <div>场景步骤</div>
                </div>
               <WebSceneBindUnit
                   webSceneStepStore={webSceneStepStore}
                   webSceneId={webSceneId}
               />
            </div>
            <div className={"table-list-box"}>
                <Table
                    columns={column}
                    dataSource={webSceneStepList}
                    rowKey = {record => record.id}
                    pagination={false}
                />
            </div>

        </>
    )


}

export default inject("webSceneStepStore")(observer(WebSceneStepList))