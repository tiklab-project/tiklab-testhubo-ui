import React, {useEffect} from "react";
import {Input, Popconfirm, Space, Table} from "antd";
import BreadcrumbCommon from "../../../../common/breadcrumbCommon";
import ApiSceneEdit from "./apiSceneEdit";
import {inject, observer} from "mobx-react";

const ApiSceneList = (props)=>{
    const {apiSceneStore} = props;
    const {findApiSceneList,apiSceneList,deleteApiScene} = apiSceneStore;

    const column =[
        {
            title: '场景名称',
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
                    <ApiSceneEdit
                        apiSceneId={record.id}
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

    useEffect(()=>{
        findPage()
    },[caseType,testType,categoryId])


    const setSessionStorage = (id) =>{
        sessionStorage.setItem("apiSceneId",id);

        props.history.push("/repositorypage/apitest/scenedetail")
    }

    const findPage = () =>{
        const param = {
            caseType:caseType,
            testType:testType,
            categoryId:categoryId
        }
        findApiSceneList(param)
    }

    const deleteCase = (id) =>{
        deleteApiScene(id).then(res=>{
            if(res.code===0){
                findPage();
            }
        })
    }


    return(
        <>
            <BreadcrumbCommon breadArray={["API","场景用例"]}/>
            <div className='case-header'>
                <ApiSceneEdit
                    name={"添加用例"}
                    btn={"btn"}
                    findPage={findPage}
                    testType={testType}
                    caseType={caseType}
                    categoryId={categoryId}
                />
                {/*<Input*/}
                {/*    placeholder={"查找"}*/}
                {/*    // onPressEnter={onSearch}*/}
                {/*    className='search-input'*/}
                {/*    style={{width:240}}*/}
                {/*/>*/}
            </div>
            <Table
                columns={column}
                dataSource={apiSceneList}
                rowKey = {record => record.id}
                pagination={false}
            />
        </>
    )
}

export default inject("apiSceneStore")(observer(ApiSceneList));
