import React, {useEffect} from "react";
import { Popconfirm, Space, Table} from "antd";
import {inject, observer} from "mobx-react";
import IconCommon from "../../../common/iconCommon";
import WebSceneStepEdit from "./webSceneStepEdit";

const WebSceneStepList = (props) => {
    const {webSceneStepStore} =props;
    const {findWebSceneStepList,webSceneStepList,deleteWebSceneStep} = webSceneStepStore;

    const column = [
        {
            title:`名称`,
            dataIndex:  "name",
            key: "name",
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
            width: '15%',
            // align:'center',
        },{
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
                    <WebSceneStepEdit
                        type={"edit"}
                        findList={findList}
                        webSceneStepId={record.id}
                    />

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
        findList()
    },[webSceneId])

   const findList = () =>{
       findWebSceneStepList(webSceneId)
   }

    return(
        <>
            <div className='title-space-between'>
                <div className={'test-title'}>
                    <div>场景步骤</div>
                </div>
                <WebSceneStepEdit type={"add"} findList={findList}/>

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