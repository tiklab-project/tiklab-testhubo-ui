import React, {useEffect, useState} from "react";
import {Input, Popconfirm, Space, Table} from "antd";
import BreadcrumbCommon from "../../../common/breadcrumbCommon";
import WebPerformEdit from "./webPerformEdit";
import {inject, observer} from "mobx-react";

const WebPerformList = (props) =>{
    const {webPerfStore,categoryStore} = props;
    const {findWebPerfList,webPerfList,deleteWebPerf}=webPerfStore;
    const {findCategoryListTree}=categoryStore;

    const column = [
        {
            title:`性能名称`,
            dataIndex: ["testCase",'name'],
            key: "name",
            render: (text,record) =>(
                <a onClick = {()=>setStorage(record.id)}>{text}</a>
            )
        },
        // {
        //     title: `类型`,
        //     dataIndex: "testType",
        //     key: "testType",
        // },
        // {
        //     title: `等级`,
        //     dataIndex: "level",
        //     key: "level",
        // },
        {
            title: `创建时间`,
            dataIndex: ['testCase','createTime'],
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
                    <WebPerformEdit
                        webPerfId={record.id}
                        name={"编辑"}
                        type={"edit"}
                    />
                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() => deleteCase(record.id)}
                        okText='确定'
                        cancelText='取消'
                    >
                        <a className="table-delete"> 删除 </a>
                    </Popconfirm>
                </Space>
            )
        },
    ]

    const caseType=localStorage.getItem("caseType");
    const testType=localStorage.getItem("testType");
    const categoryId = sessionStorage.getItem("categoryId")
    const repositoryId = localStorage.getItem("repositoryId")

    useEffect(()=>{
        findPage()
    },[])

    const findPage = () =>{
        const param = {
            caseType:caseType,
            testType:testType,
            categoryId:categoryId
        }
        findWebPerfList(param)
    }

    const deleteCase = (id) =>{
        deleteWebPerf(id).then(()=> {
            findPage();

            const params = {
                testType:testType,
                caseType:caseType,
                repositoryId:repositoryId
            }
            findCategoryListTree(params)
        })
    }

    const setStorage = (id) =>{
        sessionStorage.setItem("webPerfId",id);

        props.history.push("/repositorypage/webtest/performdetail")
    }



    return(
        <>
            <BreadcrumbCommon breadArray={["WEB","性能用例"]}/>
            <div className='case-header'>
                <WebPerformEdit
                    name={"添加用例"}
                    btn={"btn"}
                />
                {/*<Input*/}
                {/*    placeholder={`搜索`}*/}
                {/*    // onPressEnter={onSearch}*/}
                {/*    className='search-input'*/}
                {/*    style={{width:240}}*/}
                {/*/>*/}
            </div>
            <Table
                columns={column}
                dataSource={webPerfList}
                rowKey = {record => record.id}
                pagination={false}
            />

        </>
    )
}

export default inject("webPerfStore","categoryStore")(observer(WebPerformList));