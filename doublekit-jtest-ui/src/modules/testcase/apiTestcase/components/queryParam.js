/*
 * @Description: 请求参数中query可编辑表格
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-10 09:08:21
 */
import React, { useState, useEffect } from 'react';
import { observer, inject } from "mobx-react";
import {Space, Checkbox, Popconfirm} from 'antd';
import {mockValueDictionary,dataTypeDictionary} from '../../../../common/dictionary/dictionary';
import ExSelect from "../../../common/exSelect";
import {ExTable}from '../../../common/editTable';


const QueryParam = (props) =>{
    const { queryParamStore } = props;
    const {
        findQueryParamList,
        deleteQueryParam,
        createQueryParam,
        updateQueryParam,
        setList,
        queryParamList,
        dataLength,
        queryParamDataSource
    } = queryParamStore;

    /**
     * 表格头部信息
     */
    let columns= [
        {
            title: '标签',
            dataIndex: 'paramName',
            width: '18%',
            align:'center',
            editable: true,
        },
        {
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
            width: '18%',
            dataIndex: 'desc',
            align:'center',
            editable: true,

        },
        {
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
        },
        {
            title: '操作',
            align:'center',
            dataIndex: 'operation',
            render: (text, record,index) =>(operation(record,dataSource))
        }
    ]

    // 必须项的checked
    const toggleChecked = (e,row) => {
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
        if(record.id === 'QueryParamInitRow'){
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
                                :<a onClick={() =>upData(record)} > 更新</a>
                        }
                        <Popconfirm
                            title="确定删除？"
                            onConfirm={() =>deleteQueryParam(record.id)}
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
        findQueryParamList(stepId).then(res=>setDataSource(res))
    },[dataLength])

    // 添加
    const onCreated = (values) => {
        if(Object.keys(values).length === 1){
            return
        }else {
            // 创建新行的时候自带一个id，所以删了，后台会自行创建id
            delete values.id;
            createQueryParam(values)
        }
    }

    //更新
    const upData = (value) => {
        updateQueryParam(value).then(res=>setDataSource(res))
    }

    // 保存数据
    const handleSave = (row) => {
        const newData = [...queryParamList];

        const index = newData.findIndex((item) => row.id === item.id);

        newData.splice(index, 1, { ...newData[index], ...row });

        setList(newData)
    };

    return (
        <ExTable
            columns={columns}
            dataSource={queryParamList}
            handleSave={handleSave}
        />
    );
}


export default inject('queryParamStore')(observer(QueryParam));
