import React, { useState, useEffect } from 'react';
import { observer, inject } from "mobx-react";
import { Space,  Checkbox, Popconfirm} from 'antd';
import {ExTable}from '../../../../../common/EditTable'
import responseHeaderStore from "../store/responseHeaderStore";
import IconCommon from "../../../../../common/IconCommon";

// 请求参数的可编辑表格
const ResponseHeader = (props) =>{
    const {
        findResponseHeaderList,
        deleteResponseHeader,
        createResponseHeader,
        updateResponseHeader,
        setList,
        responseHeaderList,
        responseHeaderDataSource,
        dataLength
    } = responseHeaderStore;

    let columns= [
        {
            title: '参数',
            dataIndex: 'headerName',
            width: '25%',
            editable: true,
        },
        {
            title: '必须',
            dataIndex: 'required',
            width: '10%',
            // align:'center',
            render:(text,record) =>  (
                <Checkbox
                    defaultChecked={record.required}
                    onChange={(value) => toggleChecked(value, record)}
                />
            )
        },
        {
            title: '说明',
            width: '22%',
            dataIndex: 'desc',
            editable: true,
        },
        {
            title: '示例',
            width: '22%',
            dataIndex: 'eg',
            editable: true,
        },
        {
            title: '操作',
            width: '10%',
            fixed: 'right',
            dataIndex: 'operation',
            render: (text, record) =>(operation(record,dataSource))
        },
    ]


    const [newRowAction, setNewRowAction] = useState(false);

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

    // 表格checked
    const toggleChecked= (e,row)=> {
        let checked ;
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

    //本地编辑的值和返回的值比较，不想同的会显示更新按钮
    const updateView = (record,data)=>{
        return data&&data.map((item) => {
            return (
                item.id === record.id
                    ?<>
                        {
                            item.headerName === record.headerName
                            && item.required === record.required
                            && item.desc === record.desc
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
            if(record.id === 'InitNewRowId') return null

            return <Space key={record.id}>
                {
                    updateView(record,data)
                }
                <Popconfirm
                    title="确定删除？"
                    onConfirm={() => deleteResponseHeader(record.id).then(() => {
                        findResponseHeaderList(apiUnitId).then(res=>{
                            setDataSource(res)
                        })
                    })}
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


    const [dataSource,setDataSource] = useState([])
    const apiUnitId =  sessionStorage.getItem('apiUnitId');

    useEffect( ()=>{
        findResponseHeaderList(apiUnitId).then(res=>setDataSource(res))
    },[apiUnitId,dataLength])

    // 添加
    const onCreated = (values) => {
        let item = Object.keys(values)

        if(item.length === 1&&item.includes("id")){
            return
        }else  {
            // 创建新行的时候自带一个id，所以删了，后台会自行创建id
            delete values.id;
            values.apiUnit= {id:apiUnitId}
            createResponseHeader(values).then(() => {
                findResponseHeaderList(apiUnitId).then(res=>{
                    setDataSource(res)
                })
            });
        }
    }

    //更新
    const upData = (value) => {
        updateResponseHeader(value).then(() => {
            findResponseHeaderList(apiUnitId).then(res=>{
                setDataSource(res)
            })
        })
    }
    // 保存数据
    const handleSave = (row) => {
        const newData = responseHeaderList;
        const index = newData.findIndex((item) =>row.id === item.id);
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
            dataSource={responseHeaderList}
            handleSave={handleSave}
        />
    );
}


export default observer(ResponseHeader);
