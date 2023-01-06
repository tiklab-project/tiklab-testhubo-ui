/*
 * @Description:
 * @LastEditTime: 2021-10-13 17:06:47
 */
import React, { Fragment, useEffect } from 'react';
import { observer, inject } from "mobx-react";
import { Breadcrumb, Input, Table, Space, Row, Col, } from 'antd';
import ApiEnvEdit from './apiEnvEdit';

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
            align:"center",
            render: (text, record) => (
            <Space size="middle">
                <ApiEnvEdit name="编辑" type='edit' apiEnvId={record.id} />
                <span style={{'color':'red','cursor':'pointer'}} onClick={()=>deleteApiEnv(record.id)}>删除</span>
            </Space>
            ),
        },
    ]


    let repositoryId = sessionStorage.getItem("repositoryId")

    useEffect(()=> {
        
        findApiEnvList(repositoryId);
    },[repositoryId])

    return(
        <Fragment>
            <div className='header-box-margin'>
                <ApiEnvEdit name="+添加环境" type="add"  style={{ width: 200 }}/>
            </div>
            <Table
                className="tablelist"
                columns={columns}
                dataSource={apiEnvList}
                rowKey={record =>record.id}
                pagination={false}
            />
        </Fragment>
    )
}

export default inject('apiEnvStore')(observer(ApiEnvList));
