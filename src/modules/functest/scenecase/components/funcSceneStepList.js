import React, {useEffect} from "react";
import {Input, Popconfirm, Space, Table} from "antd";
import {inject, observer} from "mobx-react";
import FuncSceneBindUnit from "./FuncSceneBindUnit";

const FuncSceneStepList = (props) => {
    const {funcSceneStepStore} =props;
    const {findFuncSceneStepList,funcSceneStepList,deleteFuncSceneStep} = funcSceneStepStore;

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
                        onConfirm={() => deleteFuncSceneStep(record.id).then(()=>findFuncSceneStepList(funcSceneId))}
                        okText='确定'
                        cancelText='取消'
                    >
                        <a className="table-delete"> 删除 </a>
                    </Popconfirm>
                </Space>
            )
        },
    ]

    let funcSceneId = sessionStorage.getItem("funcSceneId")

    useEffect(()=>{
        findFuncSceneStepList(funcSceneId)
    },[funcSceneId])



    return(
        <>
            <div className='title-space-between'>
                <div className={'test-title'}>
                    <div>测试步骤</div>
                </div>
                <FuncSceneBindUnit
                    funcSceneStepStore={funcSceneStepStore}
                    funcSceneId={funcSceneId}
                />
            </div>
            <Table
                columns={column}
                dataSource={funcSceneStepList}
                rowKey = {record => record.id}
                pagination={false}
            />

        </>
    )


}

export default inject("funcSceneStepStore")(observer(FuncSceneStepList))