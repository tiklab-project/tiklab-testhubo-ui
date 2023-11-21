import React, {useEffect, useState} from "react";
import {ExTable} from "../../../../common/EditTable";
import {Popconfirm, Select, Space} from "antd";
import ifVariableStore from "../store/IfVariableStore";
import {observer} from "mobx-react";

const {Option} = Select

const IfVariableTable = (props) =>{
    const {stepId} = props
    const {
        findIfVariableList,
        ifVariableList,
        deleteIfVariable,
        createIfVariable,
        updateIfVariable,
        setList
    } = ifVariableStore;

    const columns = [
        {
            title: "变量",
            dataIndex: "variable",
            key: "variable",
            width: '30%',
            editable: true,
        },
        {
            title: "比较",
            dataIndex: "compare",
            key: "compare",
            width: '20%',
            render: (text, record)=>(
                <Select
                    style={{width:"100%"}}
                    bordered={false}
                    defaultValue={record.compare}
                    onSelect={(value)=>saveSelect(value,record)}
                >
                    <Option value={1}>等于</Option>
                    <Option value={2}>不等于</Option>
                    <Option value={3}>小于</Option>
                    <Option value={4}>小于等于</Option>
                    <Option value={5}>大于</Option>
                    <Option value={6}>大于等于</Option>
                </Select>
            )
        },{
            title: "期望",
            dataIndex: "expect",
            key: "expect",
            width: '30%',
            editable: true,
        },
        {
            title: "操作",
            key: "action",
            width: '20%',
            render: (text, record) =>(operation(record,dataSource))
        },
    ]

    const [dataSource,setDataSource] = useState([]);

    useEffect( ()=>{
        findList()
    },[])

    const findList = ()=>{
        findIfVariableList(stepId).then(res=>setDataSource(res));
    }

    /**
     *  表格里的操作
     */
    const operation = (record,data) => {
        if(record.id === 'InitRow'){
            return <a onClick={() =>onCreated(record)} >保存</a>
        }else{
            return <Space key={record.id}>
                {
                    updateView(record,data)
                }
                <Popconfirm
                    title="确定删除？"
                    onConfirm={() => deleteIfVariable(record.id).then(()=>findList())}
                    okText='确定'
                    cancelText='取消'
                    style={{
                        "cursor":"pointer"
                    }}
                >
                    <svg className="icon-s table-edit-icon" aria-hidden="true">
                        <use xlinkHref= {`#icon-shanchu3`} />
                    </svg>
                </Popconfirm>
            </Space>
        }
    }

    const saveSelect = (value,record)=>{

        let row = {
            ...record,
            compare:value,
        }

        handleSave(row)
    }

    /**
     * 本地编辑的值和返回的值比较，不想同的会显示更新按钮
     */
    const updateView = (record,data)=>{
        return data&&data.map((item) => {
            return (
                item.id === record.id
                    ?<>
                        {
                            item.variable === record.variable
                            && item.compare === record.compare
                            && item.expect === record.expect
                                ? null
                                : <a onClick={() => upData(record)}>更新</a>
                        }
                    </>
                    :null
            )
        })
    }

    /**
     * 更新
     */

    const upData = (value) => {
        updateIfVariable(value).then(()=>findList())
    }

    /**
     * 添加
     */
    const onCreated = (values) => {
        if(Object.keys(values).length > 1){
            // 创建新行的时候自带一个id，所以删了，后台会自行创建id
            delete values.id;
            values.stepId=stepId;
            createIfVariable(values).then(()=>findList())

        }
    }

    /**
     * 单元格保存数据
     */

    const handleSave = (row) => {
        const newData = [...ifVariableList];
        const index = newData.findIndex((item) => row.id === item.id);
        newData.splice(index, 1, { ...newData[index], ...row });
        setList(newData)
    };

    /**
     * 添加行
     */
    const addNewRow = () =>{

        let arr = ifVariableList.filter(item=> item.id==="InitRow")

        if(arr&&arr.length===1){
            return
        }

        const newData = {id: "InitRow"};
        const  dataSource = [...ifVariableList, newData]
        setList(dataSource)
    }


    return(
        <div className={"table-list-box"}>
            <ExTable
                dataSource={ifVariableList}
                columns={columns}
                handleSave={handleSave}
            />
            <div className={"api-status-add-box"} onClick={addNewRow}>
                <div >  新 增  </div>
            </div>
        </div>
    )
}

export default observer(IfVariableTable)