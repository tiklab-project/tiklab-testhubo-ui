import React, {useEffect, useState} from "react";
import {Input, Popconfirm, Space, Table} from "antd";
import BreadcrumbCommon from "../../../common/breadcrumbCommon";
import WebPerformEdit from "./webPerformEdit";
import {inject, observer} from "mobx-react";

const WebPerformList = (props) =>{
    const {webPerformStore} = props;
    const {findWebPerformPage,webPerformList,deleteWebPerform}=webPerformStore;

    const column = [
        {
            title:`性能名称`,
            dataIndex: "name",
            key: "name",
            render: (text,record) =>(
                <a onClick = {()=>setSessionStorage(record.id)}>{text}</a>
            )
        },
        {
            title: `类型`,
            dataIndex: "testType",
            key: "testType",
        },
        {
            title: `等级`,
            dataIndex: "level",
            key: "level",
        },
        {
            title: `创建人`,
            dataIndex: ['createUser', 'name'],
            key: "user",
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align: 'center',
            width: "15%",
            render: (text, record) => (
                <Space size="middle">
                    <WebPerformEdit name={"编辑"}/>
                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() => deleteWebPerform(record.id)}
                        okText='确定'
                        cancelText='取消'
                    >
                        <a className="table-delete"> 删除 </a>
                    </Popconfirm>
                </Space>
            )
        },
    ]

    useEffect(()=>{
        findWebPerformPage()
    },[])

    const setSessionStorage = (id) =>{
        sessionStorage.setItem("funcUnitId",id);

        props.history.push("/repositorypage/webtest/performdetail")
    }



    return(
        <>
            <BreadcrumbCommon breadArray={["WEB","性能用例"]}/>
            <div className='case-header'>
                <WebPerformEdit name={"添加用例"} btn={"btn"}/>
                <Input
                    placeholder={`搜索`}
                    // onPressEnter={onSearch}
                    className='search-input'
                    style={{width:240}}
                />
            </div>
            <Table
                columns={column}
                dataSource={webPerformList}
                rowKey = {record => record.id}
            />

        </>
    )
}

export default inject("webPerformStore")(observer(WebPerformList));