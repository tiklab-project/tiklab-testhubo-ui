/*
 * @Description:
 * @LastEditTime: 2021-10-13 17:06:47
 */
import React, { Fragment, useEffect } from 'react';
import { observer, inject } from "mobx-react";
import { Breadcrumb, Input, Table, Space, Row, Col, } from 'antd';
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
            title: "平台名",
            dataIndex: "platformName",
            key: "url",
        },
        {
            title: "appium地址",
            dataIndex: "appiumSever",
            key: "appiumSever",
        },{
            title: "设备名",
            dataIndex: "deviceName",
            key: "deviceName",
        },{
            title: "设备地址",
            dataIndex: "udId",
            key: "udId",
        },
        {
            title: "App包名",
            dataIndex: "appPackage",
            key: "appPackage",
        },
        {
            title: "App入口",
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
                <span style={{'color':'red','cursor':'pointer'}} onClick={()=>deleteAppEnv(record.id)}>删除</span>
            </Space>
            ),
        },
    ]

    useEffect(()=> {
        findAppEnvPage();
    },[])

    // 搜索
    const onSearch = (e) => {
        findAppEnvPage(e.target.value);
    }

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
            />
        </Fragment>
    )
}

export default inject('appEnvStore')(observer(AppEnvList));
