
import React, { Fragment, useEffect } from 'react';
import { observer, inject } from "mobx-react";
import {Space, Table,} from 'antd';
import WebEnvEdit from './webEnvEdit';
//
const WebEnvList = (props) => {
    const { webEnvStore } = props;
    const {
        findWebEnvPage,
        webEnvList,
        deleteWebEnv,
    } = webEnvStore;

    const columns = [
        {
            title: "环境名称",
            dataIndex: "name",
            key: "name",
            align:"center",
        },
        {
            title: "WebDriver",
            dataIndex: "webDriver",
            key: "WebDriver",
            align:"center",
        },{
            title: "操作",
            key: "action",
            align:"center",
            render: (text, record) => (
                <Space size="middle">
                    <WebEnvEdit name="编辑" type='edit' webEnvId={record.id} />
                    <span style={{'color':'red','cursor':'pointer'}} onClick={()=>deleteWebEnv(record.id)}>删除</span>
                </Space>
            ),
        },
    ]


    let repositoryId = sessionStorage.getItem("repositoryId")

    useEffect(()=> {
        findWebEnvPage(repositoryId);
    },[repositoryId])


    return(
        <Fragment>
            <WebEnvEdit name="添加环境" type="add"  style={{ width: 200 }}/>

            <Table
                className="tablelist"
                columns={columns}
                dataSource={webEnvList}
                rowKey={record =>record.id}
                pagination={false}
            />
        </Fragment>
    )
}

export default inject('webEnvStore')(observer(WebEnvList));
