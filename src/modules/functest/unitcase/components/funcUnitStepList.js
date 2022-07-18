
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
            dataIndex: "described",
            key: "described",
            // align:"center",
            width:'30%',
            editable: true,
        },
        {
            title:`预期结果`,
            dataIndex: "expect",
            key: "expect",
            align:"center",
            width:'30%',
            editable: true,
        },
        {
            title: `实际结果`,
            dataIndex: "actual",
            key: "actual",
            align:"center",
            width:'30%',
        },
        {
            title: '操作',
            // align:'center',
            dataIndex: 'operation',
            width:'25%',
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
                        <a href="#" style={{color:'red'}}>删除</a>
                    </Popconfirm>
                </Space>
            ),
        }
    ]

    const funcUnitId = sessionStorage.getItem('funcUnitId')


    useEffect(()=> {
        findFuncUnitStepList(funcUnitId)
    },[funcUnitId])



    return(
        <div className={'funtionalTest-step'}>
            <FuncUnitStepEdit
                name={'添加步骤'}
                btn={'btn'}
                findPage={findFuncUnitStepList}
            />
            <Table
                columns={columns}
                dataSource={funcUnitStepList}
                rowKey = {record => record.id}
                pagination={false}
            />
        </div>
    )
}

export default inject('funcUnitStepStore')(observer(FuncUnitStepList));
