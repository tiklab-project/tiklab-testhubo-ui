
import React, { useEffect } from 'react';
import { observer, inject } from "mobx-react";
import {Popconfirm, Space, Table} from 'antd';
import  { useTranslation } from 'react-i18next';
import FuncUnitStepEdit from "./funcUnitStepEdit";
import IconCommon from "../../../common/IconCommon";
import funcUnitStepStore from "../store/funcUnitStepStore";

const FuncUnitStepList = (props) => {
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
            dataIndex: "described",
            key: "described",
            editable: true,
        },
        {
            title:`预期结果`,
            dataIndex: "expect",
            key: "expect",
            editable: true,
        },
        {
            title: `实际结果`,
            dataIndex: "actual",
            key: "actual",
        },
        {
            title: '操作',
            // align:'center',
            dataIndex: 'operation',
            width:120,
            render: (text, record) => (
                <Space size="middle">
                    <FuncUnitStepEdit
                        name={'编辑'}
                        type={"edit"}
                        funcUnitStepId={record.id}
                        findPage={findFuncUnitStepList}
                    />
                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() =>deleteFuncUnitStep(record.id).then(()=>findFuncUnitStepList(funcUnitId))}
                        okText='确定'
                        cancelText='取消'
                    >
                        <IconCommon
                            className={"icon-s edit-icon"}
                            icon={"shanchu3"}
                        />
                    </Popconfirm>
                </Space>
            ),
        }
    ]

    const funcUnitId = sessionStorage.getItem('functionId')


    useEffect(()=> {
        findFuncUnitStepList(funcUnitId)
    },[funcUnitId])



    return(
        <>
            <div className='title-space-between'>
                <FuncUnitStepEdit
                    name={'添加步骤'}
                    btn={'btn'}
                    findPage={findFuncUnitStepList}
                />
            </div>
            <div className={"table-list-box"}>
                <Table
                    columns={columns}
                    dataSource={funcUnitStepList}
                    rowKey = {record => record.id}
                    pagination={false}
                />
            </div>
        </>
    )
}

export default observer(FuncUnitStepList);
