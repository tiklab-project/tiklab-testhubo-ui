
import React, {useEffect, useState} from 'react';
import { observer, inject } from "mobx-react";
import {Table, Space, Popconfirm, Drawer, Modal} from 'antd';
import {ExTable} from "../../../common/EditTable";
import apiEnvStore from "../store/apiEnvStore";
/**
 * 环境管理
 */
const ApiEnvModel = (props) => {
    const {
        findApiEnvList,
        apiEnvList,
        deleteApiEnv,
        createApiEnv,
        updateApiEnv,
        setList,
        dataLength,
        addNewList
    } = apiEnvStore;

    const columns = [
        {
            title: "环境名称",
            dataIndex: "name",
            key: "name",
            width: '40%',
            editable: true,
        },
        {
            title: "环境地址",
            dataIndex: "preUrl",
            key: "preUrl",
            width: '40%',
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
    const repositoryId = sessionStorage.getItem("repositoryId")


    /**
     *  表格里的操作
     */
    const operation = (record,data) => {
        if(record.id === 'apiEnvInitRow'){
            return <a onClick={() =>onCreated(record)} >保存</a>
        }else{
            return <Space key={record.id}>
                {
                    updateView(record,data)
                }
                <Popconfirm
                    title="确定删除？"
                    onConfirm={() => deleteApiEnv(record.id).then(()=>{
                        findApiEnvList(repositoryId).then(res=>setDataSource(res));
                    })}
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

    /**
     * 本地编辑的值和返回的值比较，不想同的会显示更新按钮
     */
    const updateView = (record,data)=>{
        return data&&data.map((item) => {
            return (
                item.id === record.id
                    ?<>
                        {
                            item.name === record.name
                            && item.url === record.url
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
        updateApiEnv(value).then(res => setDataSource(res))
    }

    /**
     * 添加
     */
    const onCreated = (values) => {
        if(Object.keys(values).length > 1&&values.name){
            // 创建新行的时候自带一个id，所以删了，后台会自行创建id
            delete values.id;
            values.repositoryId=repositoryId;
            createApiEnv(values).then(()=>{
                findApiEnvList(repositoryId).then(res=>setDataSource(res));
            })

        }
    }

    /**
     * 单元格保存数据
     */

    const handleSave = (row) => {
        const newData = apiEnvList;
        const index = newData.findIndex((item) => row.id === item.id);
        newData.splice(index, 1, { ...newData[index], ...row });
        setList(newData)
    };

    /**
     * 添加行
     */
    const addNewRow = () =>{

        let arr = apiEnvList.filter(item=> item.id==="apiEnvInitRow")

        if(arr&&arr.length===1){
            return
        }

        const newData = {id: "apiEnvInitRow"};
        const  dataSource = [...apiEnvList, newData]
        addNewList(dataSource)
    }

    const [isModalVisible, setIsModalVisible] = useState(false);

    /**
     * 展示弹框
     */
    const showModal = () => {
        findApiEnvList(repositoryId).then(res=>setDataSource(res));

        setIsModalVisible(true);
    };


    /**
     * 收起弹框
     */
    const handleCancel = () => {
        setIsModalVisible(false);
    };


    return(
        <>
            <a  style={{"color":"#00adff","cursor":"pointer"}} onClick={showModal}> 环境设置</a>
            <Modal
                title="环境管理"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={false}
                width={800}
            >
                <div  style={{padding:5}}>
                    <ExTable
                        dataSource={apiEnvList}
                        columns={columns}
                        handleSave={handleSave}
                    />
                    <div className={"api-status-add-box"} onClick={addNewRow}>
                        <div >  新 增  </div>
                    </div>
                </div>
            </Modal>

        </>
    )
}

export default observer(ApiEnvModel);
