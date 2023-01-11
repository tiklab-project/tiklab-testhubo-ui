import React, {useEffect} from "react";
import {Input, Popconfirm, Space, Table} from "antd";
import {inject, observer} from "mobx-react";
import WebSceneBindUnit from "./WebSceneBindUnit";

const WebSceneStepList = (props) => {
    const {webSceneStepStore} =props;
    const {findWebSceneStepList,webSceneStepList,deleteWebSceneStep} = webSceneStepStore;

    const column = [
        {
            title:`测试用例名称`,
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
            align: 'center',
            width: "15%",
            render: (text, record) => (
                <Space size="middle">
                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() => deleteWebSceneStep(record.id).then(()=>findWebSceneStepList(webSceneId))}
                        okText='确定'
                        cancelText='取消'
                    >
                        <a className="table-delete"> 删除 </a>
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
            <Table
                columns={column}
                dataSource={webSceneStepList}
                rowKey = {record => record.id}
                pagination={false}
            />

        </>
    )


}

export default inject("webSceneStepStore")(observer(WebSceneStepList))