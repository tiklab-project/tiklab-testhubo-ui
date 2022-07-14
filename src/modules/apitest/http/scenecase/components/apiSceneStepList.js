import React, {useEffect} from "react";
import {Popconfirm, Space, Table} from "antd";
import {inject, observer} from "mobx-react";
import ApiSceneBindUnit from "./apiSceneBindUnit";

const ApiSceneStepList =(props) =>{
    const {apiSceneStepStore} = props;
    const {findApiSceneStepPage,apiSceneStepList,deleteApiSceneStep} = apiSceneStepStore;

    const column = [
        {
            title: '用例名称',
            dataIndex: 'name',
            key: 'name',
            width: "30%",
            render: (text, record) => (
                <a onClick={() => setSessionStorage(record.id)}>{text}</a>
            )
        },{
            title: '请求类型',
            dataIndex: ["apiUnit","methodType"],
            key: 'requestType',
            width: "20%",
        },{
            title: '请求路径',
            dataIndex: ["apiUnit",'path'],
            key: 'path',
            width: "20%",
        },{
            title: '描述',
            dataIndex: 'desc',
            key: 'desc',
            width: "20%",
        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align: 'center',
            width: "10%",
            render: (text, record) => (
                <Space size="middle">
                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() => deleteApiSceneStep(record.id)}
                        okText='确定'
                        cancelText='取消'
                    >
                        <a className="table-delete"> 删除 </a>
                    </Popconfirm>
                </Space>
            )
        },
    ]

    const apiSceneId = sessionStorage.getItem("apiSceneId");

    useEffect(()=>{
        findApiSceneStepPage(apiSceneId)
    },[apiSceneId])

    const setSessionStorage = (id) =>{
        sessionStorage.setItem("apiUnitId",id)
        props.history.push("/repositorypage/apitest/scenestep")
    }

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            // getSelectItem(selectedRows)
        },
    };


    return(
        <>
            <div className='flex-right'>
                <ApiSceneBindUnit
                    apiSceneStepStore={apiSceneStepStore}
                />
            </div>
            <Table
                columns={column}
                dataSource={apiSceneStepList}
                rowKey = {record => record.id}
                // rowSelection={{...rowSelection}}
            />
        </>
    )
}

export default inject("apiSceneStepStore")(observer(ApiSceneStepList));