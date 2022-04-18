/*
 * @Description:
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:06:47
 */
import React, { useEffect, useState } from 'react';
import { observer, inject } from "mobx-react";
import {Input, Table, Space, Modal, Button} from 'antd';
import EnvironmentEdit from './environmentEdit';

//
const EvnMana = (props) => {
    const { environmentStore } = props;
    const {
        findEnvironmentList,
        environmentList,
        deleteEnvironment,
    } = environmentStore;

    const columns = [
        {
            title: "环境名称",
            dataIndex: "name",
            key: "name",
            align:"center",
        },
        {
            title: "环境地址",
            dataIndex: "prepositionUrl",
            key: "prepositionUrl",
            align:"center",
        },
        {
            title: "操作",
            key: "action",
            align:"center",
            render: (text, record) => (
            <Space size="middle">
                <EnvironmentEdit name="编辑" type='edit' environmentId={record.id}></EnvironmentEdit>
                <span style={{'color':'red','cursor':'pointer'}} onClick={()=>deleteEnvironment(record.id)}>删除</span>
            </Space>
            ),
        },
    ]

    const repositoryId= localStorage.getItem('repositoryId')

    useEffect(()=> {
        findEnvironmentList(repositoryId);
    },[repositoryId])

    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true);

    const onCancel = () => { setVisible(false) };

    return(
        <>
            <div className={'env-click'} onClick={showModal}><a  type="primary" >{props.name}</a></div>
            <Modal
                destroyOnClose={true}
                title={props.name}
                visible={visible}
                onCancel={onCancel}
                width={700}
                footer={false}
                centered
            >

                <Table
                    className="tablelist"
                    columns={columns}
                    dataSource={environmentList}
                    rowKey={record=>record.id}
                    pagination={false}
                />
                <div className={'modal-footer'}>
                    <Button onClick={onCancel}>取消</Button>
                    <EnvironmentEdit name="添加" type="add"  style={{ width: 200 }}/>
                </div>

            </Modal>
        </>
    )
}

export default inject('environmentStore')(observer(EvnMana));
