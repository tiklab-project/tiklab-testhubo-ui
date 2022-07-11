/**
 * @description：
 * @date: 2021-09-02 13:09
 */
import React, { useState, useEffect } from 'react';
import { observer, inject } from "mobx-react";
import {Space, Popconfirm, Table} from 'antd';
import WebUnitStepEdit from "./webUnitStepEdit";

const WebUnitStepList = (props) =>{
    const { webUnitStepStore } = props;
    const {
        findWebUnitStepList,
        deleteWebUnitStep,
        webUnitStepList,
        getSelectItem
    } = webUnitStepStore;

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
                    <WebUnitStepEdit
                        name="编辑"
                        type={"edit"}
                        webUnitStepId={record.id}
                        findPage={findWebUnitStepList}
                    />
                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() =>deleteWebUnitStep(record.id).then(()=> findWebUnitStepList(webUnitId))}
                        okText='确定'
                        cancelText='取消'
                    >
                        <a href="#" style={{color:'red'}}>删除</a>
                    </Popconfirm>
                </Space>
            ),
        }
    ]

    const webUnitId = sessionStorage.getItem('webUnitId');
    
    useEffect( ()=>{
        findWebUnitStepList(webUnitId)
    },[webUnitId])

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
                <WebUnitStepEdit
                    name={'添加步骤'} 
                    btn={'btn'}
                    findPage={findWebUnitStepList}
                />
            </div>
            <Table
                columns={columns}
                dataSource={webUnitStepList}
                rowKey={record => record.id}
                pagination={false}
                rowSelection={{...rowSelection}}
            />
        </>
    );
}

export default inject('webUnitStepStore')(observer(WebUnitStepList));
