import React, {useEffect, useState} from "react";
import ExSelect from "../../../../common/exSelect";
import {Checkbox, Popconfirm, Space} from "antd";
import {ExTable} from "../../../../common/editTable";
import {inject, observer} from "mobx-react";
import {mockValueDictionary} from "../../../../../common/dictionary/dictionary";
import DataTypeSelect from "../../../../common/dataTypeSelect";


const FormUrlencoded = (props) =>{

    const { formUrlencodedStore } = props;
    const {
        findFormUrlencodedList,
        deleteFormUrlencoded,
        createFormUrlencoded,
        updateFormUrlencoded,
        setList,
        formUrlencodedList,
        dataLength
    } = formUrlencodedStore;

    //表头
    let columns= [
        {
            title: '参数名称',
            dataIndex: 'paramName',
            width: '20%',
            editable: true,
        }, {
            title: '数据类型',
            width: '8%',
            dataIndex: 'dataType',
            render: (text, record)=>(
                <DataTypeSelect
                    defaultValue={record.dataType}
                    handleSave={handleSave}
                    rowData={record}
                />
            )
        }, {
            title: '必须',
            dataIndex: 'required',
            width: '6%',
            render:(text,record) =>  (
                <Checkbox
                    defaultChecked={record.required}
                    onChange={(value) => toggleChecked(value, record)}
                />
            )
        },{
            title: '示例值',
            width: '20%',
            dataIndex: 'value',
            render: (text, record)=>(
                <ExSelect
                    dictionary={mockValueDictionary}
                    defaultValue={record.value}
                    handleSave={handleSave}
                    rowData={record}
                    dataIndex={'value'}
                />
            )
        }, {
            title: '说明',
            width: '25%',
            dataIndex: 'desc',
            editable: true,

        }, {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record,index) =>(operation(record,dataSource))
        }
    ]

    // 表格checked
    const toggleChecked= (e,row)=> {
        let checked;
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
        if(record.id === 'FormUrlencodedInitRow'){
            return <a onClick={() =>onCreated(record)} >添加</a>
        }else{
            return data&&data.map((item) => {
                return (
                    item.id === record.id
                        ?<Space key={item.id}>
                            {
                                item.paramName === record.paramName &&
                                item.dataType === record.dataType && item.required === record.required &&
                                item.desc === record.desc && item.value === record.value
                                    ?''
                                    :<a onClick={() =>upData(record)}>更新</a>
                            }
                            <Popconfirm
                                title="确定删除？"
                                onConfirm={() =>deleteFormUrlencoded(record.id)}
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
    const apiUnitId = sessionStorage.getItem('apiUnitId');

    useEffect( ()=>{
        findFormUrlencodedList(apiUnitId).then(res => setDataSoure(res));
    },[dataLength,apiUnitId])

    //更新
    const upData = (value) => {
        updateFormUrlencoded(value).then(res=>setDataSoure(res));
    }

    // 添加
    const onCreated = (values) => {
        if(Object.keys(values).length === 1){
            return
        }else {
            delete values.id;
            createFormUrlencoded(values)
        }
    }

    // 保存数据
    const handleSave = (row) => {
        const newData = [...formUrlencodedList];

        const index = newData.findIndex((item) => row.id === item.id);

        newData.splice(index, 1, { ...newData[index], ...row });

        setList(newData)
    };


    return (
        <ExTable
            columns={columns}
            dataSource={formUrlencodedList}
            handleSave={handleSave}
        />
    );

}


export default inject('formUrlencodedStore')(observer(FormUrlencoded));
