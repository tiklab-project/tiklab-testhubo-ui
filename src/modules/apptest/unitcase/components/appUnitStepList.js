/**
 * @description：
 * @date: 2021-09-02 13:09
 */
import React, { useState, useEffect } from 'react';
import { observer, inject } from "mobx-react";
import {Space, Popconfirm, Table} from 'antd';
import AppUnitStepEdit from "./appUnitStepEdit";

const AppUnitStepList = (props) =>{
    const { appUnitStepStore } = props;
    const {
        findAppUnitStepList,
        deleteAppUnitStep,
        appUnitStepList,
        getSelectItem
    } = appUnitStepStore;

    //表头
    let columns= [
        {
            title: '操作方法',
            width: '20%',
            dataIndex: 'actionType',
            align:'center',
        },
        {
            title: '参数',
            width: '20%',
            dataIndex: 'parament',
            align:'center',
        },
        {
            title: '定位器',
            dataIndex: 'location',
            width: '20%',
            align:'center',
        },
        {
            title: '定位器的值',
            dataIndex: 'locationValue',
            width: '20%',
            align:'center',
        },
        {
            title: '操作',
            align:'center',
            width: '15%',
            dataIndex: 'operation',
            render: (text, record) => (
                <Space size="middle">
                    <AppUnitStepEdit name="编辑"  appStepId={record.id} />
                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() =>deleteAppUnitStep(record.id)}
                        okText='确定'
                        cancelText='取消'
                    >
                        <a href="#" style={{color:'red'}}>删除</a>
                    </Popconfirm>
                </Space>
            ),
        }
    ]

    const appUnitId = sessionStorage.getItem('appUnitId');
    useEffect( ()=>{
        findAppUnitStepList()
    },[])

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(selectedRows)
            getSelectItem(selectedRows)
        },
    };

    return (
        <>
            <div className={'test-title'}>
                <div>测试步骤</div>
            </div>
            <div className={'flex-right'}>
                <AppUnitStepEdit name={'添加步骤'} btn={'btn'}/>
            </div>
            <Table
                columns={columns}
                dataSource={appUnitStepList}
                rowKey={record => record.id}
                pagination={false}
                rowSelection={{...rowSelection}}
            />
        </>
    );
}

export default inject('appUnitStepStore')(observer(AppUnitStepList));
