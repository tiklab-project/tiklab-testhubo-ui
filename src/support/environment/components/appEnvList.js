
import React, { useEffect } from 'react';
import { observer, inject } from "mobx-react";
import {Table, Space, Popconfirm, Empty} from 'antd';
import AppEnvEdit from './appEnvEdit';
import IconCommon from "../../../common/IconCommon";
import emptyImg from "../../../assets/img/empty.png";

//
const AppEnvList = (props) => {
    const { appEnvStore } = props;
    const {
        findAppEnvList,
        appEnvList,
        deleteAppEnv,
    } = appEnvStore;

    const columns = [
        {
            title: "环境名称",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "platformName",
            dataIndex: "platformName",
            key: "url",
        },
        {
            title: "appiumSever",
            dataIndex: "appiumSever",
            key: "appiumSever",
        },{
            title: "deviceName",
            dataIndex: "deviceName",
            key: "deviceName",
        },
        // {
        //     title: "设备地址",
        //     dataIndex: "udId",
        //     key: "udId",
        // },
        {
            title: "appPackage",
            dataIndex: "appPackage",
            key: "appPackage",
        },
        {
            title: "appActivity",
            dataIndex: "appActivity",
            key: "appActivity",
        },
        {
            title: "操作",
            key: "action",
            width: 150,
            render: (text, record) => (
            <Space size="middle">
                <AppEnvEdit name="编辑" type='edit' appEnvId={record.id} />
                <Popconfirm
                    title="确定删除？"
                    onConfirm={() =>deleteAppEnv(record.id).then(()=> findAppEnvList(repositoryId))}
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
        findAppEnvList(repositoryId);
    },[repositoryId])


    return(
        <div className={"table-list-box"}>
            <Table
                className="tablelist"
                columns={columns}
                dataSource={appEnvList}
                rowKey={record =>record.id}
                pagination={false}
                locale={{
                    emptyText: <Empty
                        imageStyle={{
                            height: 120,
                        }}
                        description={<span>暂无环境</span>}
                        image={emptyImg}
                    />,
                }}
            />
        </div>
    )
}

export default inject('appEnvStore')(observer(AppEnvList));