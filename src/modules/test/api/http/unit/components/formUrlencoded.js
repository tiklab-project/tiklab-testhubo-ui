import React, {useEffect, useState} from "react";
import ExSelect from "../../../../../common/exSelect";
import {Checkbox, Popconfirm, Space} from "antd";
import {ExTable} from "../../../../../common/editTable";
import {inject, observer} from "mobx-react";
import {mockValueDictionary} from "../../../../../../common/dictionary/dictionary";
import DataTypeSelect from "../../../../../common/dataTypeSelect";


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

    const [dataSource,setDataSource] =useState([])
    const apiUnitId = sessionStorage.getItem('apiUnitId');

    useEffect( ()=>{
        findFormUrlencodedList(apiUnitId).then(res => setDataSource(res));
    },[dataLength,apiUnitId])
    
    //表头
    let columns= [
        {
            title: '参数名称',
            dataIndex: 'paramName',
            width: '30%',
            editable: true,
        }, {
            title: '数据类型',
            width: 150,
            dataIndex: 'dataType',
            render: (text, record)=>(
                <DataTypeSelect
                    defaultValue={record.dataType}
                    handleSave={handleSave}
                    rowData={record}
                />
            )
        },
        {
            title: '示例值',
            width: '30%',
            dataIndex: 'value',
            editable: true,
        },{
            title: '操作',
            width: 150,
            dataIndex: 'operation',
            render: (text, record,index) =>(operation(record,dataSource))
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

    // 表格里的操作
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
                    onConfirm={() => deleteFormUrlencoded(record.id)}
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
                            && item.dataType === record.dataType
                            && item.value === record.value
                                ? null
                                : <a onClick={() => upData(record)}>更新</a>
                        }
                    </>
                    :null
            )
        })
    }

    //更新
    const upData = (value) => {
        updateFormUrlencoded(value).then(res=>setDataSource(res));
    }

    // 添加
    const onCreated = (values) => {
        if(Object.keys(values).length === 1){
            return null
        }else {
            delete values.id;
            createFormUrlencoded(values)
        }

        setNewRowAction(false)
    }


    // 保存数据
    const handleSave = (row) => {
        const newData = [...formUrlencodedList];
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
            dataSource={formUrlencodedList}
            handleSave={handleSave}
        />
    );

}


export default inject('formUrlencodedStore')(observer(FormUrlencoded));