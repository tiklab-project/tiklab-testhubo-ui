import React, {useEffect, useState} from 'react';
import {Input, Popconfirm, Space, Table} from 'antd';
import funcUnitStepStore from "../store/funcUnitStepStore";
import IconCommon from "../../../common/IconCommon";
import {observer} from "mobx-react";
import FunctionStepEdit from "./FunctionStepEdit";
import FunctionStepDrawer from "./FunctionStepDrawer";

const {
    findFuncUnitStepList,
    deleteFuncUnitStep,
    updateFuncUnitStep,
    createFuncUnitStep
} = funcUnitStepStore;

const {TextArea} = Input


const FuncUnitStepTable = () => {

    const [stepList, setStepList] = useState([]);
    const funcUnitId = sessionStorage.getItem('functionId')

    useEffect(async ()=> {
        await findList()
    },[funcUnitId])

    const findList = async () =>{
        let list = await findFuncUnitStepList(funcUnitId)
        setStepList(list)
    }

    const columns = [
        {
            title:`步骤描述`,
            dataIndex: "described",
            key: "described",
            width: "40%",
            render: (text, record, index) => (
                <FunctionStepDrawer
                    name={text}
                    stepId={record.id}
                    findList={findList}
                />
            )
        },
        {
            title:`预期结果`,
            dataIndex: "expect",
            key: "expect",
            width: "25%"
        },
        {
            title: `实际结果`,
            dataIndex: "actual",
            key: "actual",
            width: "25%"
        },
        {
            title: '操作',
            dataIndex: 'operation',
            width: 150,
            render: (_, record) => (
                <Space>
                    {/*<FunctionStepEdit*/}
                    {/*    type={"edit"}*/}
                    {/*    findList={findList}*/}
                    {/*    stepId={record.id}*/}
                    {/*/>*/}
                    <Popconfirm
                        title="确定删除？"
                        // onConfirm={() =>deleteStep(record.id)}
                        okText='确定'
                        cancelText='取消'
                        placement="left"
                    >
                        <IconCommon
                            className={"icon-s edit-icon"}
                            icon={"shanchu3"}
                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            <div className={"table-list-box"}>
                <div style={{display:'flex',justifyContent:"end"}}>
                    <FunctionStepEdit findList={findList} type={"add"}/>
                </div>

                <Table
                    dataSource={stepList}
                    columns={columns}
                    rowKey = {record => record.id}
                    rowClassName="editable-row"
                    pagination={false}
                />
            </div>
        </>
    );
};


export default observer(FuncUnitStepTable);