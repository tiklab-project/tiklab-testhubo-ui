import React, {useEffect} from "react";
import {Input, Popconfirm, Space, Table} from "antd";
import {inject, observer} from "mobx-react";
import AppSceneBindUnit from "./AppSceneBindUnit";

const AppSceneStepList = (props) => {
    const {appSceneStepStore} =props;
    const {findAppSceneStepList,appSceneStepList,deleteAppScene} = appSceneStepStore;

    const column = [
        {
            title:`测试用例名称`,
            dataIndex: "name",
            key: "name",
        }, {
            title: `创建人`,
            dataIndex: ['createUser', 'name'],
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
                        onConfirm={() => deleteAppScene(record.id)}
                        okText='确定'
                        cancelText='取消'
                    >
                        <a className="table-delete"> 删除 </a>
                    </Popconfirm>
                </Space>
            )
        },
    ]

    useEffect(()=>{
        findAppSceneStepList()
    },[])

   

    return(
        <>
           <AppSceneBindUnit />
            <Table
                columns={column}
                dataSource={appSceneStepList}
                rowKey = {record => record.id}
            />

        </>
    )


}

export default inject("appSceneStepStore")(observer(AppSceneStepList))