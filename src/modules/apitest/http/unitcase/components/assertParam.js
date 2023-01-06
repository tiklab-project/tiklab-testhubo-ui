/**
 * @description：断言
 * @date: 2021-08-13 17:41
 */
import React, { useState, useEffect } from 'react';
import { observer, inject } from "mobx-react";
import { Space,  Select, Popconfirm } from 'antd';
import {ExTable}from '../../../../common/editTable';
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

    //表头
    let columns= [
        {
            title: '来源',
            dataIndex: 'source',
            width: '15%',
            render:(text,record) =>  (
                <Select
                    defaultValue={record.source}
                    bordered={false}
                    style={{'width':100}}
                    onSelect= {(e) => onSelect(e,record)}
                >
                    <Option value="状态码">状态码</Option>
                    <Option value="响应头">响应头</Option>
                    <Option value="响应体">响应体</Option>
                </Select>
            )
        },
        {
            title: '属性',
            dataIndex: 'propertyName',
            width: '20%',
            editable: true,
        },
        {
            title: '比较符',
            width: '10%',
            dataIndex: 'comparator',
            editable: true,

        },
        {
            title: '值',
            width: '20%',
            dataIndex: 'value',
            editable: true,

        },
        {
            title: '操作',
            align:'center',
            width: '10%',
            fixed: 'right',
            dataIndex: 'operation',
            render: (text, record,index) =>(operation(record,dataSource))
        },
        {
            title: '',
            width: '20%',
            dataIndex: 'none',
        }
    ]

    // 表格里的操作
    const operation = (record,data) => {
        console.log(record)
        if(record.id === 'AssertParamInitRow'){
            return <a onClick={() =>onCreated(record)} >添加</a>
        }else{
            return data&&data.map((item) => {
                return (
                    item.id === record.id
                        ?<Space key={item.id}>
                            {
                                item.source === record.source 
                                && item.propertyName === record.propertyName 
                                && item.value === record.value
                                    ?null
                                    :<a onClick={() =>upData(record)}>更新</a>
                            }
                            <Popconfirm
                                title="确定删除？"
                                onConfirm={() =>deleteAssertParam(record.id)}
                                okText='确定'
                                cancelText='取消'
                            >
                                <a href="#">删除</a>
                            </Popconfirm>
                        </Space>
                        :null
                )
            })
        }
    }

    const [dataSource,setDataSoure] =useState([])
    const apiUnitId = localStorage.getItem('apiUnitId');

    useEffect( ()=>{
        findAssertParamList(apiUnitId).then(res => setDataSoure(res));
    },[dataLength])

    //更新
    const upData = (value) => {
        updateAssertParam(value).then(res=>setDataSoure(res));
    }

    // 表格select选择事件
    const onSelect = (value, row) => {
        let setValue ;
        if(value === '状态码'){
            setValue = 1
        }else if(value === '响应头'){
            setValue = 2
        }else if(value === '响应体'){
            setValue = 3
        }
        const data = {
            ...row,
            source: setValue
        }
        handleSave(data)
    }

    // 添加
    const onCreated = (values) => {
        if(Object.keys(values).length === 1){
            return
        }else {
            delete values.id;
            createAssertParam(values)
        }
    }

    // 保存数据
    const handleSave = (row) => {
        const newData = assertParamList;
        const index = newData.findIndex((item) => row.id === item.id);
        newData.splice(index, 1, { ...newData[index], ...row });
        setList(newData)
    };


    return (
        <ExTable
            columns={columns}
            dataSource={assertParamList}
            handleSave={handleSave}
        />
    );
}

export default inject('assertParamStore')(observer(AssertParam));
