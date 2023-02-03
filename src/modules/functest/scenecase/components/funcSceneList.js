import React, {useEffect} from "react";
import {Input, Popconfirm, Space, Table} from "antd";
import BreadcrumbCommon from "../../../common/breadcrumbCommon";
import {inject, observer} from "mobx-react";
import FuncSceneEdit from "./funcSceneEdit";

const FuncSceneList = (props) => {
    const {funcSceneStore,categoryStore} = props;
    const {findFuncSceneList,funcSceneList,deleteFuncScene}=funcSceneStore;
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
                    
                    <FuncSceneEdit
                        funcSceneId={record.id}
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
    const repositoryId = sessionStorage.getItem("repositoryId")

    useEffect(()=>{
        findPage()
    },[caseType,testType,categoryId])

    const findPage = () =>{
        const param = {
            caseType:caseType,
            testType:testType,
            categoryId:categoryId
        }
        findFuncSceneList(param)
    }

    const deleteCase = (id) =>{
        deleteFuncScene(id).then(()=> {
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
        sessionStorage.setItem("funcSceneId",id);

        props.history.push("/repository/functest/scenedetail")
    }


    return(
        <>
            <BreadcrumbCommon breadArray={["功能测试","场景用例"]}/>
            <div className='case-header'>
                <FuncSceneEdit
                    name={"添加场景用例"}
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
                dataSource={funcSceneList}
                rowKey = {record => record.id}
                pagination={false}
            />

        </>
    )


}

export default inject("funcSceneStore","categoryStore")(observer(FuncSceneList))