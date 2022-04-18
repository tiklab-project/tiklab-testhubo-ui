/*
 * @Description:
 * @LastEditTime: 2021-10-13 17:06:47
 */
import React, { Fragment, useEffect } from 'react';
import { observer, inject } from "mobx-react";
import { Breadcrumb, Input, Table, Space, Row, Col, } from 'antd';
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
        },
    ]

    useEffect(()=> {
        findWebEnvPage();
    },[])

    // 搜索
    const onSearch = (e) => {
        findWebEnvPage(e.target.value);
    }

    return(
        <Fragment>

            <Table
                className="tablelist"
                columns={columns}
                dataSource={webEnvList}
                rowKey={record =>record.id}
            />
        </Fragment>
    )
}

export default inject('webEnvStore')(observer(WebEnvList));
