/*
 * @Description:
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:06:47
 */
import React, { useEffect, useState } from 'react';
import { observer, inject } from "mobx-react";
import {Popconfirm, Space, Table} from "antd";
import AgentConfigEdit from "./AgentConfigEdit";
import IconCommon from "../../../common/IconCommon";

//
const AgentConfigList = (props) => {
    const { agentConfigStore } = props;
    const {
        findAgentConfigList,
        agentConfigList,
        deleteAgentConfig,
    } = agentConfigStore;

    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            width: "20%",
        },{
            title: '地址',
            dataIndex: 'url',
            key: 'url',
            width: "40%",
        },
        // {
        //     title: '状态',
        //     dataIndex: 'status',
        //     key: 'status',
        //     width: "10%",
        // },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            width: "20%",
        }, {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            width: "20%",
            render: (text, record) => (
                <Space size="middle">
                    <AgentConfigEdit
                        type={"edit"}
                        name={"编辑"}
                        agentConfigId={record.id}
                    />
                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() => deleteAgentConfig(record.id).then(()=>findAgentConfigList(repositoryId))}
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
        }
    ]

    const repositoryId= sessionStorage.getItem('repositoryId')

    useEffect(()=> {
        findAgentConfigList(repositoryId);
    },[repositoryId])

 

    return(
        <div className={"content-box-center"}>
            <div  className={"header-box-space-between"} >
                <div className={'header-box-title'}>Agent配置</div>
                <AgentConfigEdit
                    type={"add"}
                    name={"添加Agent"}
                />
            </div>
            <div className={"table-list-box"}>
                <Table
                    className="tablelist"
                    columns={columns}
                    dataSource={agentConfigList}
                    rowKey={record => record.id}
                    pagination={false}
                />
            </div>
        </div>
    )
}

export default inject('agentConfigStore')(observer(AgentConfigList));
