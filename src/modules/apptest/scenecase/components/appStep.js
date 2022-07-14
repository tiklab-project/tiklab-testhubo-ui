/**
 * @description：
 * @date: 2021-09-02 13:09
 */
import React, { useEffect } from 'react';
import { observer, inject } from "mobx-react";
import {Space, Popconfirm, Table} from 'antd';
import AppStepEdit from "./appStepEdit";

const AppStep = (props) =>{
    const { appStepStore } = props;
    const {
        findAppStepList,
        deleteAppStep,
        appStepList,
        getSelectItem
    } = appStepStore;

    //表头
    let columns= [
        {
            title: '操作方法',
            width: '15%',
            dataIndex: 'actionType',
            align:'center',
        },
        {
            title: '参数',
            width: '20%',
            dataIndex: 'parameter',
            align:'center',
        },
        {
            title: '定位器',
            dataIndex: 'location',
            width: '15%',
            align:'center',
        },
        {
            title: '定位器的值',
            dataIndex: 'locationValue',
            width: '30%',
            // align:'center',
            ellipsis:true
        },
        {
            title: '操作',
            align:'center',
            dataIndex: 'operation',
            render: (text, record) => (
                <Space size="middle">
                    <AppStepEdit name="编辑"  appStepId={record.id} />
                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() =>deleteAppStep(record.id)}
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
        findAppStepList(testcaseId)
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
                <AppStepEdit name={'添加步骤'} btn={'btn'}/>
            </div>
            <Table
                columns={columns}
                dataSource={appStepList}
                rowKey={record => record.id}
                pagination={false}
                rowSelection={{...rowSelection}}
            />
        </>
    );
}

export default inject('appStepStore')(observer(AppStep));