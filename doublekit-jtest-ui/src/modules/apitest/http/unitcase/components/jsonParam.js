/*
 * @Description: 请求参数中Json的可编辑表格组件
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:56:56
 */
import React, { useState, useEffect } from 'react';
import { observer, inject } from "mobx-react";
import { toJS } from 'mobx';
import { Tooltip, Space, Checkbox, Popconfirm} from 'antd';
import { PlusCircleTwoTone, MinusCircleTwoTone } from "@ant-design/icons";
import {dataTypeDictionary, mockValueDictionary} from '../../../../../common/dictionary/dictionary';
import ExSelect from "../../../../common/exSelect";
import {ExTable}from '../../../../common/editTable';

const JsonParam = (props) => {
    const { jsonParamStore, radioValue} = props;
    const {
        findJsonParamListTree,
        deleteJsonParam,
        createJsonParam,
        updateJsonParam,
        setList,
        addList,
        jsonParamList,
        setJsonParamListChild
    } = jsonParamStore;



    //表头
    const columns = [
        {
            title: '参数名称',
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
            width: '8%',
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
            // align:'center',
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
            // align:'center',
            dataIndex: 'operation',
            render: (text, record, index) =>(operation(record,dataSource)
                // <>
                //     {
                //         record.id==='jsonParamInitRow'||record.id==='jsonParamInitRowChild'
                //         ?<Tooltip title="添加数据"><a onClick={() =>onCreated(record, index)} >添加</a></Tooltip>
                //         :<Space>
                //             {record.dataType==='object'?<a onClick={() => addChild(record.dataType, record.id)}> 子</a>:''}
                //             {
                //                 jsonParamList.map(item=>{
                //                     return(
                //                         item.id === record.id&& item.paramName === record.paramName &&
                //                     item.dataType === record.dataType && item.required === record.required &&
                //                     item.desc === record.desc && item.eg === record.eg
                //                         ?''
                //                         :<a onClick={() =>updateJsonParam(record)} > 更新 </a>
                //                     )
                //                 })
                //             }
                //             <a onClick={() =>deleteJsonParam(record.id)} > 删除 </a>
                //         </Space>
                //     }
                //
                // </>
            )
        }
    ]


    // 表格里的操作
    const operation = (record,data) => {
// debugger
        if(record.id==='jsonParamInitRow'||record.id==='jsonParamInitRowChild'){
            return <Tooltip title="添加数据"><a onClick={() =>onCreated(record)} >添加</a></Tooltip>
        }else{
            return data&&data.map((item) => {

                // if(item.children&&item.children.length>0){
                //     operation(record.children,item.children)
                // }else {
                    return (
                        item.id === record.id
                        ?<Space key={item.id}>
                            {
                                item.paramName === record.paramName &&
                                item.dataType === record.dataType && item.required === record.required &&
                                item.desc === record.desc && item.eg === record.eg
                                    ?''
                                    :<a onClick={() =>upData(record)} > 更新 </a>
                            }
                            <Popconfirm
                                title="确定删除？"
                                onConfirm={() =>deleteJsonParam(record.id)}
                                okText='确定'
                                cancelText='取消'
                            >
                                <a href="#">删除</a>
                            </Popconfirm>
                            {record.dataType==='object'?<a onClick={() => addChild(record.dataType, record.id)}> 子</a>:''}
                        </Space>
                        :''
                    )
                // }
            })
        }
    }


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

    const [dataSource,setDataSoure] =useState([])
    const stepId = localStorage.getItem('stepId');
    useEffect(()=>{
        findJsonParamListTree(stepId).then(res => setDataSoure(res));
    },[radioValue])


    // 点击子按钮，添加子行
    const addChild = (dataType, parentid) => {
        if(dataType === 'object'){
            // 调用store,显示子行
            setJsonParamListChild(parentid)
        }
    }

    // 点击保存按钮，添加
    const onCreated = (data) => {
        const values = data;
        values.method = {
            id: stepId
        }
        createJsonParam(values);
    }
    //更新
    const upData = (value) => {
        updateJsonParam(value).then(res=>setDataSoure(res));
    }



    // 递归数据
    const loop = (data, result=[], row) => {
        const parentId = row.parent && row.parent.id;
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
        let result = loop(toJS(jsonParamList), [], row)
        setList(result)
    };




    return (
        <ExTable
            columns={columns}
            dataSource={jsonParamList}
            handleSave={handleSave}
        />
    );
}

export default inject('jsonParamStore')(observer(JsonParam));
