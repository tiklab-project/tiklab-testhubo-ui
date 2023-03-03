/**
 * @description：断言
 * @date: 2021-08-13 17:41
 */
import React, { useState, useEffect } from 'react';
import { observer, inject } from "mobx-react";
import { Space,  Select, Popconfirm } from 'antd';
import {ExTable}from '../../../../../common/EditTable';
import IconCommon from "../../../../../common/IconCommon";
const { Option } = Select;


// 请求参数的可编辑表格
const AssertParam = (props) =>{
    const { assertParamStore } = props;
    const {
        findAssertParamList,
        deleteAssertParam,
        createAssertParam,
        updateAssertParam,
        setList,
        assertParamList,
        dataLength
    } = assertParamStore;
    
    const [dataSource,setDataSource] =useState([])
    const apiUnitId = sessionStorage.getItem('apiUnitId');

    useEffect( ()=>{
        findAssertParamList(apiUnitId).then(res => setDataSource(res));
    },[dataLength])

    //更新
    //表头
    let columns= [
        {
            title: '来源',
            dataIndex: 'source',
            width: '20%',
            render:(text,record) =>  (
                <Select
                    defaultValue={record.source}
                    allowClear
                    bordered={false}
                    style={{'width':"100%"}}
                    onSelect= {(e) => onSelect(e,record)}
                >
                    <Option value={1}>状态码</Option>
                    <Option value={2}>响应头</Option>
                    <Option value={3}>响应体</Option>
                </Select>
            )
        },
        {
            title: '属性',
            dataIndex: 'propertyName',
            width: '32%',
            editable: true,
        },
        // {
        //     title: '比较符',
        //     width: '10%',
        //     dataIndex: 'comparator',
        //     render:()=>(<span>=</span>)
        //
        // },
        {
            title: '值',
            width: '32%',
            dataIndex: 'value',
            editable: true,
        },
        {
            title: '操作',
            width: 150,
            dataIndex: 'operation',
            render: (text, record,index) =>(operation(record,dataSource))
        }
    ]

    // 表格select选择事件
    const onSelect = (value, row) => {
        const data = {
            ...row,
            source: value
        }
        handleSave(data);

        setNewRowAction(true)
    }

    //取消
    const onCancel = () =>{
        let data = {
            "id":"InitNewRowId",
            "source":null,
            "propertyName":null,
            "comparator":null,
            "value":null
        }
        handleSave(data)

        //隐藏
        setNewRowAction(false)
    }

    const [newRowAction, setNewRowAction] = useState(false);

    // colums 里的操作
    const operation = (record,data) => {
        if(record.id === 'InitNewRowId'){
            return <div className={`${newRowAction?"newRow-action-show":"newRow-action-hidden"}`}>
                <Space>
                    <a onClick={() =>onCreated(record)}> 保存</a>
                    <a onClick={()=>onCancel()}> 取消</a>
                </Space>
            </div>
        }else{
            return <Space key={record.id}>
                {
                    updateView(record,data)
                }
                <Popconfirm
                    title="确定删除？"
                    onConfirm={() => deleteAssertParam(record.id)}
                    okText='确定'
                    cancelText='取消'
                >
                    <IconCommon
                        icon={"shanchu3"}
                        className="icon-s table-edit-icon"
                    />
                </Popconfirm>
            </Space>
        }
    }

    //本地编辑的值和返回的值比较，不想同的会显示更新按钮
    const updateView = (record,data)=>{
        return data&&data.map((item) => {
            return (
                item.id === record.id
                    ?<>
                        {
                            item.source === record.source
                            && item.propertyName === record.propertyName
                            && item.comparator === record.comparator
                            && item.value === record.value
                                ? null
                                : <IconCommon
                                    icon={"btn_confirm"}
                                    className="icon-s table-edit-icon"
                                    onClick={() => upData(record)}
                                />
                        }
                    </>
                    :null
            )
        })
    }

    //更新
    const upData = (value) => {
        updateAssertParam(value).then(res => setDataSource(res))
    }

    // 添加
    const onCreated = (values) => {
        if(Object.keys(values).length === 1){
            return null
        }else {
            // 创建新行的时候自带一个id，所以删了，后台会自行创建id
            delete values.id;
            createAssertParam(values)
        }

        setNewRowAction(false)
    }

    // 保存数据
    const handleSave = (row) => {
        const newData = assertParamList;
        const index = newData.findIndex((item) => row.id === item.id);
        newData.splice(index, 1, { ...newData[index], ...row });
        setList(newData)

        //如果是新行 操作 显示操作按钮
        if(row.id==="InitNewRowId"){
            document.addEventListener('keydown', (e) =>{
                setNewRowAction(true)
            });
        }
    };


    return (
        <>
            <div style={{margin:"8px 0"}}>
                <span  className={"table-item-title"}>断言参数</span>
            </div>
            <ExTable
                columns={columns}
                dataSource={assertParamList}
                handleSave={handleSave}
            />
        </>

    );
}

export default inject('assertParamStore')(observer(AssertParam));
