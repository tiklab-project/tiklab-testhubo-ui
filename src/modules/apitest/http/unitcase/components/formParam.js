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
import FileTextSelect from "../../../../common/fileTextSelect";
import IconCommon from "../../../../common/iconCommon";

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

    const [dataSource,setDataSource] =useState([])
    const apiUnitId = sessionStorage.getItem('apiUnitId');
    
    useEffect( ()=>{
        findFormParamList(apiUnitId).then(res => setDataSource(res));
    },[dataLength,apiUnitId])

    //表头
    let columns= [
        {
            title: '参数',
            dataIndex: 'paramName',
            width: '30%',
            editable: true,
        },{
            title: '数据类型',
            width: 150,
            dataIndex: 'dataType',
            render: (text, record)=>(
                <FileTextSelect
                    defaultValue={record.dataType}
                    handleSave={handleSave}
                    rowData={record}
                    setNewRowAction={setNewRowAction}
                />
            )
        },
        {
            title: '参数值',
            dataIndex: 'value',
            width: '30%',
            editable: true,
        },{
            title: '操作',
            width: 150,
            dataIndex: 'operation',
            render: (text, record) =>(operation(record,dataSource))
        }
    ]

    //取消
    const onCancel = () =>{
        let data = {
            id:"InitNewRowId",
            "paramName":null,
            "dataType":null,
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
                    onConfirm={() => deleteFormParam(record.id)}
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
                            item.paramName === record.paramName
                            && item.dataType === record.dataType
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
        updateFormParam(value).then(res => setDataSource(res))
    }

    // 添加
    const onCreated = (values) => {
        if(Object.keys(values).length === 1){
            return null
        }else {
            // 创建新行的时候自带一个id，所以删了，后台会自行创建id
            delete values.id;
            createFormParam(values)
        }

        setNewRowAction(false)
    }


    // 保存数据
    const handleSave = (row) => {
        const newData = formParamList;
        const index = newData.findIndex((item) => row.id === item.id);
        newData.splice(index, 1, { ...newData[index], ...row });
        setList(newData)

        //如果是新行 操作 显示操作按钮
        if(row.id==="InitNewRowId"){
            //当新行按键按下的时候显示后面的操作按钮
            document.addEventListener('keydown', (e) =>{
                setNewRowAction(true)
            });
        }
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
