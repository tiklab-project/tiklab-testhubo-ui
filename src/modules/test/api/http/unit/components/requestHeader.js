import React, { useState, useEffect } from 'react';
import { observer, inject } from "mobx-react";
import { Space, Popconfirm } from 'antd';
import { headerParamDictionary } from '../../../../../../common/dictionary/dictionary';
import ExSelect from "../../../../../common/exSelect";
import {ExTable}from '../../../../../common/editTable';
import IconCommon from "../../../../../common/iconCommon";

// 请求头的可编辑表格
const RequestHeader = (props) =>{
    const { requestHeaderStore } = props;
    const {
        findRequestHeaderList,
        deleteRequestHeader,
        createRequestHeader,
        updateRequestHeader,
        setList,
        headerList,
        dataLength,
        headerSourceList
    } = requestHeaderStore;

    const [dataSource,setDataSource] = useState([])
    const apiUnitId = sessionStorage.getItem('apiUnitId');

    useEffect( ()=>{
        findRequestHeaderList(apiUnitId).then(list=>setDataSource(list))
    },[apiUnitId,dataLength])


    //表头
    let columns= [
        {
            title: '参数',
            dataIndex: 'headerName',
            width: '40%',
            render: (text, record)=>(
                <ExSelect
                    dictionary={headerParamDictionary}
                    defaultValue={record.headerName}
                    handleSave={handleSave}
                    rowData={record}
                    dataIndex={'headerName'}
                    setNewRowAction={setNewRowAction}
                />
            )
        },
        {
            title: '参数值',
            dataIndex: 'value',
            width: '40%',
            editable: true,
        },
        {
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
            "headerName":null,
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
                    onConfirm={() => deleteRequestHeader(record.id)}
                    okText='确定'
                    cancelText='取消'
                >
                    <IconCommon
                        icon={"shanchu3"}
                        className={"icon-s table-edit-icon"}
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
                            item.headerName === record.headerName
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
        updateRequestHeader(value).then(res => setDataSource(res))
    }

    // 添加
    const onCreated = (values) => {
        let item = Object.keys(values)

        if(item.length === 1&&item.includes("id")){
            return
        }else {
            // 创建新行的时候自带一个id，所以删了，后台会自行创建id
            delete values.id;
            createRequestHeader(values);
        }

        setNewRowAction(false)
    }


    // 保存数据
    const handleSave = (row) => {
        const newData = [...headerList];
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
                <span  className={"table-item-title"}>请求头参数</span>
            </div>
            <ExTable
                columns={columns}
                dataSource={headerList}
                handleSave={handleSave}
            />
        </>

    );
}

export default inject('requestHeaderStore')(observer(RequestHeader));
