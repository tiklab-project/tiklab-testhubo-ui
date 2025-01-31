import React, { useEffect } from 'react';
import { observer, inject } from "mobx-react";
import {Empty, Popconfirm, Space, Table,} from 'antd';
import WebEnvEdit from './webEnvEdit';
import IconCommon from "../../../common/IconCommon";

const WebEnvList = (props) => {
    const { webEnvStore } = props;
    const {
        findWebEnvList,
        webEnvList,
        deleteWebEnv,
    } = webEnvStore;

    const columns = [
        {
            title: "环境名称",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "WebDriver",
            dataIndex: "webDriver",
            key: "WebDriver",
        },{
            title: "操作",
            key: "action",
            width: 150,
            render: (text, record) => (
                <Space size="middle">
                    <WebEnvEdit name="编辑" type='edit' webEnvId={record.id} />
                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() =>deleteWebEnv(record.id).then(()=>findWebEnvList(repositoryId))}
                        okText='确定'
                        cancelText='取消'
                    >
                        <IconCommon
                            className={"icon-s edit-icon"}
                            icon={"shanchu3"}
                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ]

    let repositoryId = sessionStorage.getItem("repositoryId")

    useEffect(()=> {
        findWebEnvList(repositoryId);
    },[repositoryId])


    return(
        <div className={"table-list-box"}>
            <Table
                className="tablelist"
                columns={columns}
                dataSource={webEnvList}
                rowKey={record =>record.id}
                pagination={false}
                locale={{
                    emptyText: <Empty
                        imageStyle={{
                            height: 100,
                        }}
                        description={<span>暂无环境</span>}
                    />,
                }}
            />
        </div>
    )
}

export default inject('webEnvStore')(observer(WebEnvList));
