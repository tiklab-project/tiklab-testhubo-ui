import React, { useState, useEffect } from 'react';
import { observer, inject } from "mobx-react";
import { Space, Checkbox, Popconfirm } from 'antd';
import { headerParamDictionary } from '../../../../../common/dictionary/dictionary';
import ExSelect from "../../../../common/exSelect";
import {ExTable}from '../../../../common/editTable';

// 请求头的可编辑表格
const RequestHeader = (props) =>{
    const { requestHeaderStore } = props;
    const {
        findRequestHeaderList,
        deleteRequestHeader,
        createRequestHeader,
        updateRequestHeader,
        setList,
        requestHeaderList,
        dataLength,
        requestHeaderDataSource
    } = requestHeaderStore;

    //表头
    let columns= [
        {
            title: '标签',
            dataIndex: 'headerName',
            width: '20%',
            align:'center',
            render: (text, record)=>(
                <ExSelect
                    dictionary={headerParamDictionary}
                    defaultValue={record.headerName}
                    handleSave={handleSave}
                    rowData={record}
                    dataIndex={'headerName'}
                />
            )
        },
        {
            title: '必须',
            dataIndex: 'required',
            width: '10%',
            align:'center',
            render:(text,record) =>  (
                <Checkbox defaultChecked={record.required} onChange={(value) => toggleChecked(value, record)}/>
            )
        },
        {
            title: '说明',
            width: '20%',
            dataIndex: 'desc',
            align:'center',
            editable: true,
        },
        {
            title: '示例',
            width: '20%',
            dataIndex: 'eg',
            align:'center',
            editable: true,
        },
        {
            title: '操作',
            align:'center',
            dataIndex: 'operation',
            render: (text, record,index) =>(operation(record,dataSource))
        }
    ]

    // 表格里checked
    const toggleChecked= (e,row)=> {
        let checked = '';
        if(e.target.checked){
            checked = 1
        }else{
            checked = 0
        }
        const data = {
            ...row,
            required: checked
        }
        handleSave(data)
    }

    // 表格里的操作
    const operation = (record,data) => {
        if(record.id === 'RequestHeaderInitRow'){
            return <a onClick={() =>onCreated(record)} >添加</a>
        }else{
            return data&&data.map((item) => {
                return (
                    item.id === record.id
                    ?<Space key={item.id}>
                        {
                            item.headerName === record.headerName &&
                            item.required === record.required && item.desc === record.desc &&
                            item.eg === record.eg
                                ?''
                                :<a onClick={() =>upData(record)}>更新</a>
                        }
                        <Popconfirm
                            title="确定删除？"
                            onConfirm={() =>deleteRequestHeader(record.id)}
                            okText='确定'
                            cancelText='取消'
                        >
                            <a href="#">删除</a>
                        </Popconfirm>
                    </Space>
                    :''
                )
            })
        }
    }

    const [dataSource,setDataSource] = useState([])

    const stepId = localStorage.getItem('stepId');
    useEffect( ()=>{
        findRequestHeaderList(stepId).then(res=>setDataSource(res))
    },[dataLength])

    // 添加
    const onCreated = (values) => {
        if(Object.keys(values).length === 1){
            return
        }else {
            // 创建新行的时候自带一个id，所以删了，后台会自行创建id
            delete values.id;
            values.step = {
                id:stepId
            }
            createRequestHeader(values)
        }
    }

    //更新
    const upData = (value) => {
        updateRequestHeader(value).then(res => setDataSource(res))
    }

    // 保存数据
    const handleSave = (row) => {
        const newData = [...requestHeaderList];
        const index = newData.findIndex((item) => row.id === item.id);
        newData.splice(index, 1, { ...newData[index], ...row });
        setList(newData)
    };


    return (
        <ExTable
            columns={columns}
            dataSource={requestHeaderList}
            handleSave={handleSave}
        />
    );
}

export default inject('requestHeaderStore')(observer(RequestHeader));
