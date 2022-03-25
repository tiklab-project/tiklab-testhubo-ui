/*
 * @Description: 返回结果中Json的可编辑表格
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:58:08
 */
import React, { useState, useEffect } from 'react';
import { observer, inject } from "mobx-react";
import { Tooltip, Space,Checkbox } from 'antd';
import { toJS } from 'mobx';
import ExSelect from "../../../common/exSelect";
import {ExTable}from '../../../common/editTable';
import {dataTypeDictionary, mockValueDictionary} from '../../../../common/dictionary/dictionary';


const JsonResponse = (props) => {
    const { jsonResponseStore, radioValue } = props;
    const {
        findJsonResponseListTree,
        deleteJsonResponse,
        createJsonResponse,
        updateJsonResponse,
        setList,
        addList,
        jsonResponseList,
        setJsonResponseListChild
    } = jsonResponseStore;

    const [count, setCount] = useState(1);

    //表头
    const columns = [
        {
            title: '参数名称',
            dataIndex: 'propertyName',
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
            render: (text, record, index) =>(
                <Space>
                    <Tooltip title="数据类型: object，添加子行"><a onClick={() => addChild(record.dataType,record.id)}> 子</a></Tooltip>
                    <Tooltip title="添加数据"><a onClick={() =>onCreated(record, index)} >create </a></Tooltip>
                    <Tooltip title="更新数据"><a onClick={() =>updateJsonResponse(record)} > update </a></Tooltip>
                    <Tooltip title="删除数据"><a onClick={() =>deleteJsonResponse(record.id)} type="primary"> delete </a></Tooltip>
                    <Tooltip title="新增一行"><a onClick={() =>handleAdd()} > + </a></Tooltip>
                    {/* <Button shape="circle">上</Button>
                    <Button shape="circle">下</Button> */}
                </Space>
            )
        }
    ]

    const stepId =  localStorage.getItem('stepId');

    useEffect(()=>{
        findJsonResponseListTree(stepId)
    },[radioValue])

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

    // 表格select选择事件
    const onSelect = (value, row) => {
        const data = {
            ...row,
            dataType: value
        }
        handleSave(data)
    }

    // 点击子按钮，添加子行
    const addChild = (dataType,  parentid) => {
        if(dataType === 'object'){
            // 调用store,显示子行
            setJsonResponseListChild(parentid)
        }
    }

    // 点击保存按钮，添加
    const onCreated = (data) => {
        const values = data;
        delete values.id;
        values.step = {
            id: stepId
        }
        createJsonResponse(values)

    }

    // 添加下一行
    const handleAdd = () => {
        const newData = [{
            id: count
        }];
        setCount(count+1);
        addList(newData)
    };


    // 递归数据
    const loop = (data, result=[], row) => {
        const parentId = row.parent && row.parent.id;
        // 没有parentid
        if(!parentId) {
            result = data.map(item => {
                if(item.id === row.id) {
                    return {...item, ...row}
                }
                return item
            })
        } else {
            data.forEach((item, index) => {
                if(item.id && item.id === row.id) {
                    result.push({
                        ...row,
                        children:item.children ? [] : null
                    })
                } else {
                    result.push({
                        ...item,
                        children:item.children ? [] : null
                    })
                }
                if(item.children && item.children.length > 0) {
                    loop(item.children, result[index].children, row)
                }
            });
        }
        return result
    }


    // 编辑单元格，保存数据
    const handleSave = (row) => {
        let result = loop(toJS(jsonResponseList), [], row)
        setList(result)
    };

    return (
        <ExTable
            columns={columns}
            dataSource={jsonResponseList}
            handleSave={handleSave}
        />
    );
}

export default inject('jsonResponseStore')(observer(JsonResponse));
