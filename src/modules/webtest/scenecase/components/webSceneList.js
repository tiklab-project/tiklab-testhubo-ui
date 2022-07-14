import React, {useEffect} from "react";
import {Input, Popconfirm, Space, Table} from "antd";
import BreadcrumbCommon from "../../../common/breadcrumbCommon";
import WebSceneEdit from "./webSceneEdit";
import {inject, observer} from "mobx-react";

const WebSceneList = (props) => {
    const {webSceneStore,categoryStore} = props;
    const {findWebSceneList,webSceneList,deleteWebScene}=webSceneStore;
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
                    <WebSceneEdit
                        webSceneId={record.id}
                        name={"编辑"}
                        type={"edit"}
                        findPage={findPage}
                        testType={testType}
                        caseType={caseType}
                        categoryId={categoryId}
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
    },[caseType,testType,categoryId])
    
    const findPage = () =>{
        const param = {
            caseType:caseType,
            testType:testType,
            categoryId:categoryId
        }
        findWebSceneList(param)
    }

    const deleteCase = (id) =>{
        deleteWebScene(id).then(()=> {
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
        sessionStorage.setItem("webSceneId",id);

        props.history.push("/repositorypage/webtest/scenedetail")
    }


    return(
        <>
            <BreadcrumbCommon breadArray={["WEB","场景用例"]}/>
            <div className='case-header'>
                <WebSceneEdit
                    name={"添加用例"}
                    btn={"btn"}
                    findPage={findPage}
                    testType={testType}
                    caseType={caseType}
                    categoryId={categoryId}
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
                dataSource={webSceneList}
                rowKey = {record => record.id}
                pagination={false}
            />

        </>
    )


}

export default inject("webSceneStore","categoryStore")(observer(WebSceneList))