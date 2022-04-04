/*
 * @Description: 空间列表页
 */
import React, { useEffect } from 'react';
import { observer, inject } from "mobx-react";
import {Popconfirm, Space, Table} from 'antd';
import  { useTranslation } from 'react-i18next';
import FuncUnitStepEdit from "./funcUnitStepEdit";

const FuncUnitStepList = (props) => {
    const { funcUnitStepStore } = props;
    const {
        findFuncUnitStepList,
        deleteFuncUnitStep,
        funcUnitStepList,
    } = funcUnitStepStore;

    const { t } = useTranslation();

    //列表头
    const columns = [
        {
            title:`步骤描述`,
            dataIndex: "name",
            key: "name",
            // align:"center",
            width:'30%',
            editable: true,
        },
        {
            title:`预期结果`,
            dataIndex: "expectResult",
            key: "expectResult",
            align:"center",
            width:'30%',
            editable: true,
        },
        {
            title: `实际结果`,
            dataIndex: "actualResult",
            key: "actualResult",
            align:"center",
            width:'30%',
        },
        {
            title: '操作',
            align:'center',
            dataIndex: 'operation',
            width:'10%',
            render: (text, record) => (
                <Space size="middle">
                    <FuncUnitStepEdit name={'编辑'} funcUnitStepId={record.id}/>
                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() =>deleteFuncUnitStep(record.id)}
                        okText='确定'
                        cancelText='取消'
                    >
                        <a href="#" style={{color:'red'}}>{t('tcdelete')}</a>
                    </Popconfirm>
                </Space>
            ),
        }
    ]

    const funcUnitId = sessionStorage.getItem('funcUnitId')


    useEffect(()=> {
        findFuncUnitStepList(1)
    },[funcUnitId])



    return(
        <div className={'funtionalTest-step'}>
            <FuncUnitStepEdit name={'添加步骤'} />
            <Table
                columns={columns}
                dataSource={funcUnitStepList}
                rowKey = {record => record.id}
            />
        </div>
    )
}

export default inject('funcUnitStepStore')(observer(FuncUnitStepList));
