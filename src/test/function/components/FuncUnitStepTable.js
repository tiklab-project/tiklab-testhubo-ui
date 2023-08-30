import React, {useEffect, useState} from 'react';
import {Form, Input, Popconfirm, Space, Table} from 'antd';
import funcUnitStepStore from "../store/funcUnitStepStore";
import IconCommon from "../../../common/IconCommon";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";
import {messageFn} from "../../../common/messageCommon/MessageCommon";
import {observer} from "mobx-react";

const {
    findFuncUnitStepList,
    deleteFuncUnitStep,
    updateFuncUnitStep,
    createFuncUnitStep
} = funcUnitStepStore;

const {TextArea} = Input


const FuncUnitStepTable = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState("");
    const isEditing = (record) => record.id === editingKey;

    const funcUnitId = sessionStorage.getItem('functionId')
    useEffect(async ()=> {
        let list = await findFuncUnitStepList(funcUnitId)

        setData(list)
    },[funcUnitId])

    /**
     * 编辑
     */
    const edit = (record) => {
        form.setFieldsValue({
            described: '',
            expect: '',
            actual: '',
            ...record,
        });
        setEditingKey(record.id);
    };

    /**
     * 取消编辑
     */
    const cancel = () => {

        const existingNewRow = data.find(item => item.id === 'NEW_ROW');
        if(existingNewRow) {
            // 过滤掉新行数据
            setData(data.filter(item => item.id !== 'NEW_ROW'));
        }

        setEditingKey('');
    };

    /**
     * 保存
     */
    const save = async (id) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => id === item.id);
            if (index > -1) {
                const item = newData[index];
                let updateRowData = {
                    ...item,
                    ...row,
                }
                //本地列表更新
                newData.splice(index, 1, updateRowData);
                setData(newData);
                setEditingKey('');

                if(updateRowData.id==="NEW_ROW"){
                    delete updateRowData.id

                    updateRowData.funcUnitId=funcUnitId
                     createFuncUnitStep(updateRowData).then(()=>{
                         findFuncUnitStepList(funcUnitId).then(list=>{
                             setData(list)
                         })
                    })
                }else {
                    //保存到数据库
                    await updateFuncUnitStep(updateRowData)
                }

                form.resetFields();
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            messageFn("error",)
        }
    };

    const deleteStep = (id)=>{
        deleteFuncUnitStep(id).then(()=> {
            findFuncUnitStepList(funcUnitId).then(list=>{
                setData(list)
            })
        })

    }

    const columns = [
        {
            title:`步骤描述`,
            dataIndex: "described",
            key: "described",
            editable: true,
            width: "40%"
        },
        {
            title:`预期结果`,
            dataIndex: "expect",
            key: "expect",
            editable: true,
            width: "25%"
        },
        {
            title: `实际结果`,
            dataIndex: "actual",
            key: "actual",
            editable: true,
            width: "25%"
        },
        {
            title: '操作',
            dataIndex: 'operation',
            width: 150,
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <Space>
                        <CheckOutlined  onClick={() => save(record.id)}/>
                        <CloseOutlined  onClick={cancel}/>
                    </Space>
                ) : (
                    <Space>
                        <IconCommon
                            icon={"bianji11"}
                            className={"icon-s edit-icon"}
                            onClick={() => edit(record)}
                        />
                        <Popconfirm
                            title="确定删除？"
                            onConfirm={() =>deleteStep(record.id)}
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

                );
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: "text",
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const addNewRow = () =>{

        const existingNewRow = data.find(item => item.id === 'NEW_ROW');

        if(!existingNewRow){
            let newRow = {
                described: '',
                expect: '',
                actual: '',
                id:"NEW_ROW"
            }
            setData( [...data,newRow])
            setEditingKey("NEW_ROW");
        }

    }

    return (
        <>
            <div className={"table-list-box"}>
                <Form form={form} component={false} preserve={true}>
                    <Table
                        components={{
                            body: {cell: EditableCell},
                        }}
                        dataSource={data}
                        columns={mergedColumns}
                        rowKey = {record => record.id}
                        rowClassName="editable-row"
                        pagination={false}
                    />
                </Form>
                <div className={"function-step_add"} onClick={addNewRow}>
                    <div >  添加步骤  </div>
                </div>
            </div>
        </>
    );
};

const EditableCell = ({
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
  }) => {
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0}}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    <TextArea autoSize={{ minRows: 2, maxRows: 2 }}/>
                    {/*<Input />*/}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};


export default observer(FuncUnitStepTable);