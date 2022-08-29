
import React, { Fragment, useEffect } from 'react';
import { observer, inject } from "mobx-react";
import {  Table, Space } from 'antd';
import AppEnvEdit from './appEnvEdit';

//
const AppEnvList = (props) => {
    const { appEnvStore } = props;
    const {
        findAppEnvPage,
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
            align:"center",
            render: (text, record) => (
            <Space size="middle">
                <AppEnvEdit name="编辑" type='edit' appEnvId={record.id} />
                <span style={{'color':'red','cursor':'pointer'}} onClick={()=>deleteAppEnv(record.id).then(()=>findAppEnvPage(repositoryId))}>删除</span>
            </Space>
            ),
        },
    ]

    let repositoryId = sessionStorage.getItem("repositoryId")

    useEffect(()=> {
        findAppEnvPage(repositoryId);
    },[repositoryId])


    return(
        <Fragment>
            <div className='wslist-searchbtn'>
                <AppEnvEdit name="+添加环境" type="add"  style={{ width: 200 }}/>
            </div>
            <Table
                className="tablelist"
                columns={columns}
                dataSource={appEnvList}
                rowKey={record =>record.id}
                pagination={false}
            />
        </Fragment>
    )
}

export default inject('appEnvStore')(observer(AppEnvList));
