import React, {useEffect} from "react";
import {Input, Popconfirm, Space, Table} from "antd";
import BreadcrumbCommon from "../../../common/breadcrumbCommon";
import AppSceneEdit from "./appSceneEdit";
import {inject, observer} from "mobx-react";

const AppSceneList = (props) => {
    const {appSceneStore,categoryStore} = props;
    const {findAppSceneList,appSceneList,deleteAppScene}=appSceneStore;
    const {findCategoryListTree}=categoryStore;

    const column = [
        {
            title:`场景名称`,
            dataIndex: ["testCase",'name'],
            key: "name",
            render: (text,record) =>(
                <a onClick = {()=>setStorage(record.id)}>{text}</a>
            )
        },
        {
            title: `创建时间`,
            dataIndex: ['testCase','createTime'],
            key: "user",
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
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align: 'center',
            width: "15%",
            render: (text, record) => (
                <Space size="middle">
                    <AppSceneEdit
                        appSceneId={record.id}
                        name={"编辑"}
                        type={"edit"}
                    />
                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() => deleteFn(record.id)}
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
    },[caseType,testType,categoryId])


    const findPage = () =>{
        const param = {
            caseType:caseType,
            testType:testType,
            categoryId:categoryId
        }
        findAppSceneList(param)
    }


    const deleteFn = (id) =>{
        deleteAppScene(id).then(()=> {
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
        sessionStorage.setItem("appSceneId",id);

        props.history.push("/repositorypage/apptest/scenedetail")
    }



    return(
        <>
            <BreadcrumbCommon breadArray={["APP","场景用例"]}/>
            <div className='case-header'>
                <AppSceneEdit
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
                dataSource={appSceneList}
                rowKey = {record => record.id}
                pagination={false}
            />

        </>
    )


}

export default inject("appSceneStore","categoryStore")(observer(AppSceneList))