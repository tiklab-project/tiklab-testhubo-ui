import React, {useEffect} from "react";
import {Input, Popconfirm, Space, Table} from "antd";
import BreadcrumbCommon from "../../../common/breadcrumbCommon";
import WebScenecaseEdit from "./webSceneEdit";
import {inject, observer} from "mobx-react";

const WebSceneList = (props) => {
    const {webSceneStore} = props;
    const {findWebScenePage,webSceneList,deleteWebScene}=webSceneStore;
    
    const column = [
        {
            title:`用场景名称`,
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
                    <WebScenecaseEdit name={"编辑"}/>
                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() => deleteWebScene(record.id)}
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
        findWebScenePage()
    },[])

    const setSessionStorage = (id) =>{
        sessionStorage.setItem("funcUnitId",id);

        props.history.push("/repositorypage/webtest/scenedetail")
    }



    return(
        <>
            <BreadcrumbCommon breadArray={["WEB","场景用例"]}/>
            <div className='case-header'>
                <WebScenecaseEdit name={"添加用例"} btn={"btn"}/>
                <Input
                    placeholder={`搜索`}
                    // onPressEnter={onSearch}
                    className='search-input'
                    style={{width:240}}
                />
            </div>
            <Table
                columns={column}
                dataSource={webSceneList}
                rowKey = {record => record.id}
            />

        </>
    )


}

export default inject("webSceneStore")(observer(WebSceneList))