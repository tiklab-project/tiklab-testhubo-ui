/*
 * @Description:
 * @LastEditTime: 2021-10-13 17:06:47
 */
import React, { Fragment, useEffect } from 'react';
import { observer, inject } from "mobx-react";
import {Breadcrumb, Input, Table, Space, Row, Col, Popconfirm, Empty,} from 'antd';
import ApiEnvEdit from './apiEnvEdit';
import IconCommon from "../../../common/iconCommon";
import emptyImg from "../../../../assets/img/empty.png";

//
const ApiEnvList = (props) => {
    const { apiEnvStore } = props;
    const {
        findApiEnvList,
        apiEnvList,
        deleteApiEnv,
    } = apiEnvStore;

    const columns = [
        {
            title: "环境名称",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "环境地址",
            dataIndex: "preUrl",
            key: "preUrl",
        },
        {
            title: "操作",
            key: "action",
            width: 150,
            render: (text, record) => (
            <Space size="middle">
                <ApiEnvEdit name="编辑" type='edit' apiEnvId={record.id} />
                <Popconfirm
                    title="确定删除？"
                    onConfirm={() =>deleteApiEnv(record.id)}
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
        
        findApiEnvList(repositoryId);
    },[repositoryId])

    return(
        <div className={"table-list-box"}>
            <Table
                className="tablelist"
                columns={columns}
                dataSource={apiEnvList}
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

export default inject('apiEnvStore')(observer(ApiEnvList));
