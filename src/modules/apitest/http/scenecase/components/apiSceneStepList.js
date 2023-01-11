import React, {useEffect} from "react";
import {Popconfirm, Space, Table} from "antd";
import {inject, observer} from "mobx-react";
import ApiSceneBindUnit from "./apiSceneBindUnit";
import IconCommon from "../../../../common/iconCommon";

const ApiSceneStepList =(props) =>{
    const {apiSceneStepStore} = props;
    const {findApiSceneStepPage,apiSceneStepList,deleteApiSceneStep} = apiSceneStepStore;

    const column = [
        {
            title: '用例名称',
            dataIndex: 'name',
            key: 'name',
            width: "20%",
            render: (text, record) => (
                <a onClick={() => setSessionStorage(record.id)}>{text}</a>
            )
        },{
            title: '请求类型',
            dataIndex: ["apiUnit","methodType"],
            key: 'requestType',
            width: "15%",
        },{
            title: '请求路径',
            dataIndex: ["apiUnit",'path'],
            key: 'path',
            width: "20%",
        },{
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            width: "15%",
        },{
            title: '描述',
            dataIndex: 'desc',
            key: 'desc',
            width: "20%",
        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            width: 80,
            render: (text, record) => (
                <Space size="middle">
                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() =>deleteApiSceneStep(record.id).then(()=>findApiSceneStepPage(apiSceneId))}
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
            <div className='title-space-between'>
                <div className={'test-title'}>
                    <div>测试步骤</div>
                </div>
                <ApiSceneBindUnit apiSceneStepStore={apiSceneStepStore}/>
            </div>
            <div className={"table-list-box"}>
                <Table
                    columns={column}
                    dataSource={apiSceneStepList}
                    rowKey = {record => record.id}
                    // rowSelection={{...rowSelection}}
                    pagination={false}
                />
            </div>
        </>
    )
}

export default inject("apiSceneStepStore")(observer(ApiSceneStepList));