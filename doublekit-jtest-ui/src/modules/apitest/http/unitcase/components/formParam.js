/*
 * @Description:  请求参数中From可编辑表格
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:47:43
 */

import React, { useState, useEffect } from 'react';
import { observer, inject } from "mobx-react";
import {Space, Checkbox, Popconfirm} from 'antd';
import {mockValueDictionary,dataTypeDictionary} from '../../../../../common/dictionary/dictionary';
import ExSelect from "../../../../common/exSelect";
import {ExTable}from '../../../../common/editTable';

const FormParam = (props) =>{

    const { formParamStore } = props;
    const {
        findFormParamList,
        deleteFormParam,
        createFormParam,
        updateFormParam,
        setList,
        formParamList,
        dataLength
    } = formParamStore;

    //表头
    let columns= [
        {
            title: '参数名称',
            dataIndex: 'paramName',
            width: '18%',
            align:'center',
            editable: true,
        },{
            title: '数据类型',
            width: '10%',
            dataIndex: 'dataType',
            align:'center',
            render: (text, record)=>(
                <ExSelect
                    dictionary={dataTypeDictionary}
                    defaultValue={record.dataType}
                    handleSave={handleSave}
                    rowData={record}
                    dataIndex={'dataType'}
                />
            )
        },{
            title: '必须',
            dataIndex: 'required',
            width: '10%',
            align:'center',
            render:(text,record) =>  (
                <Checkbox
                    defaultChecked={record.required}
                    onChange={(value) => toggleChecked(value, record)}
                />
            )
        },{
            title: '示例',
            width: '18%',
            dataIndex: 'eg',
            align:'center',
            render: (text, record)=>(
                <ExSelect
                    dictionary={mockValueDictionary}
                    defaultValue={record.eg}
                    handleSave={handleSave}
                    rowData={record}
                    dataIndex={'eg'}
                />
            )
        },{
            title: '说明',
            width: '18%',
            dataIndex: 'desc',
            align:'center',
            editable: true,

        },{
            title: '操作',
            align:'center',
            dataIndex: 'operation',
            render: (text, record,index) =>(operation(record,dataSource))
        }
    ]

    // 表格checked
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
        console.log(record)
        if(record.id === 'FormParamInitRow'){
            return <a onClick={() =>onCreated(record)} >添加</a>
        }else{
            return data&&data.map((item) => {
                return (
                    item.id === record.id
                    ?<Space key={item.id}>
                        {
                            item.paramName === record.paramName &&
                            item.dataType === record.dataType && item.required === record.required &&
                            item.desc === record.desc && item.eg === record.eg
                                ?''
                                :<a onClick={() =>upData(record)}>更新</a>
                        }
                        <Popconfirm
                            title="确定删除？"
                            onConfirm={() =>deleteFormParam(record.id)}
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

    const [dataSource,setDataSoure] =useState([])

    const stepId = localStorage.getItem('stepId');
    useEffect( ()=>{
        findFormParamList(stepId).then(res => setDataSoure(res));
    },[dataLength])

    //更新
    const upData = (value) => {
        updateFormParam(value).then(res=>setDataSoure(res));
    }

    // 添加
    const onCreated = (values) => {
        if(Object.keys(values).length === 1){
            return
        }else {
            delete values.id;
            createFormParam(values)
        }
    }

    // 保存数据
    const handleSave = (row) => {
        const newData = [...formParamList];

        const index = newData.findIndex((item) => row.id === item.id);

        newData.splice(index, 1, { ...newData[index], ...row });

        setList(newData)
    };


    return (
        <ExTable
            columns={columns}
            dataSource={formParamList}
            handleSave={handleSave}
        />
    );

}



export default inject('formParamStore')(observer(FormParam));
