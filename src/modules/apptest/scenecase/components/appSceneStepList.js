import React, {useEffect} from "react";
import { Popconfirm, Space, Table} from "antd";
import {inject, observer} from "mobx-react";
import IconCommon from "../../../common/iconCommon";
import AppSceneStepEdit from "./appSceneStepEdit";

const AppSceneStepList = (props) => {
    const {appSceneStepStore} =props;
    const {findAppSceneStepList,appSceneStepList,deleteAppSceneStep} = appSceneStepStore;

    const column = [
        {
            title:`名称`,
            dataIndex:  "name",
            key: "name",
            width: '10%',
        },
        {
            title: '操作方法',
            width: '15%',
            dataIndex: 'actionType',
            // align:'center',
        },
        {
            title: '参数',
            width: '15%',
            dataIndex: 'parameter',
            // align:'center',
        },
        {
            title: '定位器',
            dataIndex: 'location',
            width: '15%',
            // align:'center',
        },
        {
            title: '定位器的值',
            dataIndex: 'locationValue',
            // width: '15%',
            // align:'center',
        },
        // {
        //     title: `创建时间`,
        //     dataIndex: "createTime",
        //     key: "createTime",
        // },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            width: 120,
            render: (text, record) => (
                <Space size="middle">
                    <AppSceneStepEdit
                        type={"edit"}
                        findList={findList}
                        appSceneStepId={record.id}
                    />

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
        findList()
    },[appSceneId])

    const findList = () =>{
        findAppSceneStepList(appSceneId)
    }

    return(
        <>
            <div className='title-space-between'>
                <div className={'test-title'}>
                    <div>场景步骤</div>
                </div>
                <AppSceneStepEdit
                    type={"add"}
                    findList={findList}
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