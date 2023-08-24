import React, {useEffect} from "react";
import {Popconfirm, Space, Table} from "antd";
import {inject, observer} from "mobx-react";
import ApiSceneBindUnit from "./apiSceneBindUnit";
import IconCommon from "../../../../../common/IconCommon";
import apiSceneStepStore from "../store/apiSceneStepStore";

const ApiSceneStepList =(props) =>{
    const {findApiSceneStepList,apiSceneStepList,deleteApiSceneStep} = apiSceneStepStore;

    const column = [
        {
            title: '用例名称',
            dataIndex: ["apiUnit","testCase",'name'],
            key: 'name',
            width: "25%",
            render: (text, record) => (
                props.type ? <a onClick={() => setSessionStorage(record.apiUnit.id)}>{text}</a>:<span>{text}</span>
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
            width: "25%",
        },{
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
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
                        onConfirm={() =>deleteApiSceneStep(record.id).then(()=>findApiSceneStepList(apiSceneId))}
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
        findApiSceneStepList(apiSceneId)
    },[apiSceneId])

    const setSessionStorage = (id) =>{
        sessionStorage.setItem("apiUnitId",id)
        props.history.push("/repository/testcase/api-scene-to-unit")
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

export default observer(ApiSceneStepList);