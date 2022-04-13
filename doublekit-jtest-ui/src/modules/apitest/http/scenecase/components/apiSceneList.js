import React, {useEffect} from "react";
import {Input, Popconfirm, Space, Table} from "antd";
import BreadcrumbCommon from "../../../../common/breadcrumbCommon";
import ApiSceneEdit from "./apiSceneEdit";
import {inject, observer} from "mobx-react";

const ApiSceneList = (props)=>{
    const {apiSceneStore} = props;
    const {findApiScenePage,apiSceneList,deleteApiScene} = apiSceneStore;

    const column =[
        {
            title: '用例名称',
            dataIndex: ["testCase",'name'],
            key: 'name',
            // width: "30%",
            render: (text, record) => (
                <a onClick={() => setSessionStorage(record.id)}>{text}</a>
            )
        },{
            title: `创建时间`,
            dataIndex: ['testCase','createTime'],
            key: "user",
        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align: 'center',
            width: "15%",
            render: (text, record) => (
                <Space size="middle">
                    <ApiSceneEdit apiSceneId={record.id}  name={"编辑"}/>
                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() => deleteApiScene(record.id)}
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

    useEffect(()=>{
        const param = {
            caseType:caseType,
            testType:testType,
            categoryId:categoryId
        }
        findApiScenePage(param)
    },[categoryId])

    const setSessionStorage = (id) =>{
        sessionStorage.setItem("apiSceneId",id);

        props.history.push("/repositorypage/apitest/scenedetail")
    }

    return(
        <>
            <BreadcrumbCommon breadArray={["API","场景用例"]}/>
            <div className='case-header'>
                <Input
                    placeholder={"查找"}
                    // onPressEnter={onSearch}
                    className='search-input'
                    style={{width:240}}
                />

                <ApiSceneEdit  name={"添加用例"} btn={"btn"}/>
            </div>
            <Table
                columns={column}
                dataSource={apiSceneList}
                rowKey = {record => record.id}
            />
        </>
    )
}

export default inject("apiSceneStore")(observer(ApiSceneList));
