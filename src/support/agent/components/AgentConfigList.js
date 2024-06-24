/*
 * @Description:
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:06:47
 */
import React, { useEffect } from 'react';
import { observer } from "mobx-react";
import {Popconfirm, Space, Table,Switch} from "antd";
import IconCommon from "../../../common/IconCommon";
import agentConfigStore from "../store/AgentConfigStore";
import {CheckCircleTwoTone, CloseCircleTwoTone} from "@ant-design/icons";

//
const AgentConfigList = (props) => {
    const {
        findAgentConfigList,
        agentConfigList,
        deleteAgentConfig,
        updateAgentConfig
    } = agentConfigStore;

    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            width: "20%",
        },{
            title: '地址',
            dataIndex: 'address',
            key: 'address',
            width: "30%",
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: "20%",
            render: (text, record) => (
                <div>
                    {
                        record.status === "online"
                            ? <CheckCircleTwoTone twoToneColor={"green"}/>
                            : <CloseCircleTwoTone twoToneColor={"red"}/>
                    }
                </div>
            )
        },
        {
            title: '启用',
            dataIndex: 'enable',
            key: 'enable',
            width: "20%",
            render:(text, record)=>(
                <Switch
                    checked={text===1}
                    checkedChildren="启用"
                    unCheckedChildren="停用"
                    onChange={(e)=>changeEnable(e,record)}
                />
            )
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            width: "10%",
            render: (text, record) => (
                <>
                    {
                        record.name!=="agent-default"
                            ?<Popconfirm
                                title="确定删除？"
                                onConfirm={() => deleteAgentConfig(record.id).then(()=>findAgentConfigList())}
                                okText='确定'
                                cancelText='取消'
                            >
                                <IconCommon
                                    className={"icon-s edit-icon"}
                                    icon={"shanchu3"}
                                />
                            </Popconfirm>
                            :<span />
                    }
                </>
            )
        }
    ]

    useEffect(async ()=> {
        await findAgentConfigList();
    },[])

    /**
     * 列表中的是否可以切换
     */
    const changeEnable = async (e,record) => {
        if(e===true){
            record.enable=1;
        }else {
            record.enable=0;
        }
        await updateAgentConfig(record)
        await findAgentConfigList();
    }


    return(
        <div className={"content-box-center"}>
            <div  className={"header-box-space-between"} >
                <div className={'header-box-title'}>Agent配置</div>
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

export default observer(AgentConfigList);
