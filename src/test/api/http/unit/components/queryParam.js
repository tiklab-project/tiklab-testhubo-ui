/*
 * @Description: 请求参数中query可编辑表格
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-10 09:08:21
 */
import React, { useState, useEffect } from 'react';
import { observer, inject } from "mobx-react";
import {Space, Popconfirm} from 'antd';
import {mockValueDictionary} from '../../../../../common/dictionary/dictionary';
import ExSelect from "../../../../../common/ExSelect";
import {ExTable}from '../../../../../common/EditTable';
import IconCommon from "../../../../../common/IconCommon";

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


    const [dataSource,setDataSource] = useState([])
    const apiUnitId = sessionStorage.getItem('apiUnitId');

    useEffect( ()=>{
        findQueryParamList(apiUnitId).then(res=>setDataSource(res))
    },[dataLength,apiUnitId])

    let columns= [
        {
            title: '参数',
            dataIndex: 'paramName',
            width: '40%',
            editable: true,
        },
        {
            title: '参数值',
            width: '40%',
            dataIndex: 'value',
            render: (text, record)=>(
                <ExSelect
                    dictionary={mockValueDictionary}
                    defaultValue={record.value}
                    handleSave={handleSave}
                    rowData={record}
                    dataIndex={'value'}
                    setNewRowAction={setNewRowAction}
                />
            )

        },
        {
            title: '操作',
            width: 150,
            dataIndex: 'operation',
            render: (text, record) =>(operation(record,dataSource))
        },
    ]


    //取消
    const onCancel = () =>{
        let data = {
            id:"InitNewRowId",
            "paramName":null,
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
                    onConfirm={() => deleteQueryParam(record.id)}
                    okText='确定'
                    cancelText='取消'
                >
                    <svg className="icon-s table-edit-icon" aria-hidden="true">
                        <use xlinkHref= {`#icon-shanchu3`} />
                    </svg>
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
                            && item.value === record.value
                                ? null
                                : <IconCommon
                                    icon={"btn_confirm"}
                                    className={"icon-s table-edit-icon"}
                                    onClick={()=>upData(record)}
                                />
                        }
                    </>
                    :null
            )
        })
    }

    //更新
    const upData = (value) => {
        updateQueryParam(value).then(res => setDataSource(res))
    }

    // 添加
    const onCreated = (values) => {
        if(Object.keys(values).length === 1){
            return
        }else {
            // 创建新行的时候自带一个id，所以删了，后台会自行创建id
            delete values.id;
            createQueryParam(values);
        }

        setNewRowAction(false)
    }

    // 保存数据
    const handleSave = (row) => {
        const newData = queryParamList;
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
        <>
            <div style={{margin:"8px 0"}}>
                <span  className={"table-item-title"}>查询参数</span>
            </div>
            <ExTable
                columns={columns}
                dataSource={queryParamList}
                handleSave={handleSave}
            />
        </>
    );
}


export default inject('queryParamStore')(observer(QueryParam));
