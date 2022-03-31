import React, {useEffect} from "react";
import {Input, Popconfirm, Space, Table} from "antd";
import BreadcrumbCommon from "../../../common/breadcrumbCommon";
import ApiScenecaseEdit from "./apiScenecaseEdit";
import {inject, observer} from "mobx-react";

const ApiScenecaseList = (props)=>{
    const {apiSceneStore} = props;
    const {findApiScenePage,apiSceneList} = apiSceneStore;
    const column =[
        {
            title: '用例名称',
            dataIndex: 'name',
            key: 'name',
            // width: "30%",
            render: (text, record) => (
                <a onClick={() => setSessionStorage(record.id)}>{text}</a>
            )
        },{
            title: '类型',
            dataIndex: 'testType',
            key: 'testType',
            // width: "30%",
        },{
            title: '等级',
            dataIndex: 'level',
            key: 'level',
            // width: "20%",
        },{
            title: `创建人`,
            dataIndex: ['user', 'name'],
            key: "user",
        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align: 'center',
            width: "15%",
            render: (text, record) => (
                <Space size="middle">
                    <div>
                        <div>编辑</div>
                    </div>
                    <Popconfirm
                        title="确定删除？"
                        // onConfirm={() => deleteTestCase(record.id)}
                        okText='确定'
                        cancelText='取消'
                    >
                        <a className="table-delete"> 删除 </a>
                    </Popconfirm>
                </Space>
            )
        },
    ]

    const categoryId = sessionStorage.getItem("categoryId")

    useEffect(()=>{
        findApiScenePage(categoryId)
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

                <ApiScenecaseEdit  name={"添加用例"} btn={"btn"}/>
            </div>
            <Table
                columns={column}
                dataSource={apiSceneList}
                rowKey = {record => record.id}
            />
        </>
    )
}

export default inject("apiSceneStore")(observer(ApiScenecaseList));
