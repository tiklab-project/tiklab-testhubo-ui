import React, {useEffect} from "react";
import {Input, Popconfirm, Space, Table} from "antd";
import BreadcrumbCommon from "../../../common/breadcrumbCommon";
import WebUnitEdit from "./webUnitEdit";
import {inject, observer} from "mobx-react";

const WebUnitList = (props) => {
    const {webUnitStore,categoryStore} = props;
    const {findWebUnitPage,webUnitList,deleteWebUnit}=webUnitStore;
    const {findCategoryListTree}=categoryStore;

    const column = [
        {
            title:`用例名称`,
            dataIndex:  ['testCase',"name"],
            key: "name",
            render: (text,record) =>(
                <a onClick = {()=>setSessionStorage(record.id)}>{text}</a>
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
                    <WebUnitEdit
                        name={"编辑"}
                        type={"edit"}
                        webUnitId={record.id}
                        findPage={findPage}
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
    },[categoryId])

    const findPage = ()=>{
        const param = {
            caseType:caseType,
            testType:testType,
            categoryId:categoryId
        }
        findWebUnitPage(param)
    }


    const setSessionStorage = (id) =>{
        sessionStorage.setItem("webUnitId",id);

        props.history.push("/repositorypage/webtest/unitdetail")
    }

    const deleteFn = (id)=>{

        deleteWebUnit(id).then(()=>{
            findPage();

            const params = {
                testType:testType,
                caseType:caseType,
                repositoryId:repositoryId
            }
            findCategoryListTree(params)
        })

    }

    return(
        <>
            <BreadcrumbCommon breadArray={["WEB","测试用例"]}/>
            <div className='case-header'>
                <WebUnitEdit
                    name={"添加用例"}
                    btn={"btn"}
                    categoryId={categoryId}
                    caseType={caseType}
                    testType={testType}
                    findPage={findPage}
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
                dataSource={webUnitList}
                rowKey = {record => record.id}
                pagination={false}
            />

        </>
    )


}

export default inject("webUnitStore","categoryStore")(observer(WebUnitList))