/**
 * @description：
 * @date: 2021-09-02 13:09
 */
import React, { useState, useEffect } from 'react';
import { observer, inject } from "mobx-react";
import {Space, Popconfirm, Table} from 'antd';
import WebStepEdit from "./webEdit";

const WebStep = (props) =>{
    const { webStepStore } = props;
    const {
        findWebStepList,
        deleteWebStep,
        webStepList,
        getSelectItem
    } = webStepStore;

    //表头
    let columns= [
        {
            title: '操作方法',
            width: '10%',
            dataIndex: 'actionType',
            align:'center',
        },
        {
            title: '参数',
            width: '15%',
            dataIndex: 'parament',
            align:'center',
        },
        {
            title: '定位器',
            dataIndex: 'location',
            width: '10%',
            align:'center',
        },
        {
            title: '定位器的值',
            dataIndex: 'locationPrice',
            width: '15%',
            align:'center',
        },
        {
            title: '操作',
            align:'center',
            dataIndex: 'operation',
            render: (text, record) => (
                <Space size="middle">
                    <WebStepEdit name="编辑"  webStepId={record.id} />
                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() =>deleteWebStep(record.id)}
                        okText='确定'
                        cancelText='取消'
                    >
                        <a href="#" style={{color:'red'}}>删除</a>
                    </Popconfirm>
                </Space>
            ),
        }
    ]

    const testcaseId = localStorage.getItem('testcaseId');
    useEffect( ()=>{
        findWebStepList(testcaseId)
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
                <WebStepEdit name={'添加步骤'} btn={'btn'}/>
            </div>
            <Table
                columns={columns}
                dataSource={webStepList}
                rowKey={record => record.id}
                pagination={false}
                rowSelection={{...rowSelection}}
            />
        </>
    );
}

export default inject('webStepStore')(observer(WebStep));
