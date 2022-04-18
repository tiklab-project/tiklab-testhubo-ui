import React, {useEffect} from "react";
import {Input, Popconfirm, Space, Table} from "antd";
import BreadcrumbCommon from "../../../common/breadcrumbCommon";
import {inject, observer} from "mobx-react";
import FuncSceneEdit from "./funcSceneEdit";

const FuncSceneList = (props) => {
    const {funcSceneStore} =props;
    const {findFuncScenePage,funcSceneList,deleteFuncScene} = funcSceneStore;

    const column = [
        {
            title:`场景名称`,
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
                    <div>
                        <FuncSceneEdit name={"编辑"}/>
                    </div>
                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() => deleteFuncScene(record.id)}
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
        findFuncScenePage()
    },[])

    const setSessionStorage = (id) =>{
        sessionStorage.setItem("funcSceneId",id);

        props.history.push("/repositorypage/functest/scenedetail")
    }


    return(
        <>
            <BreadcrumbCommon breadArray={["功能测试","测试用例"]}/>
            <div className='case-header'>
                <FuncSceneEdit name={"添加场景用例"} btn={"btn"}/>
                <Input
                    placeholder={`搜索`}
                    // onPressEnter={onSearch}
                    className='search-input'
                    style={{width:240}}
                />
            </div>
            <Table
                columns={column}
                dataSource={funcSceneList}
                rowKey = {record => record.id}
            />

        </>
    )


}

export default inject("funcSceneStore")(observer(FuncSceneList))