import React, {useEffect} from "react";
import {Input, Popconfirm, Space, Table} from "antd";
import BreadcrumbCommon from "../../../common/breadcrumbCommon";
import AppUnitEdit from "./appUnitEdit";
import {inject, observer} from "mobx-react";

const AppUnitList = (props) => {
    const {appUnitStore,categoryStore} = props;
    const {findAppUnitList,appUnitList,deleteAppUnit}=appUnitStore;
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
                    <AppUnitEdit
                        name={"编辑"}
                        type={"edit"}
                        appUnitId={record.id}
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

    const findPage = ()=>{
        const param = {
            caseType:caseType,
            testType:testType,
            categoryId:categoryId
        }
        findAppUnitList(param)
    }

    const setSessionStorage = (id) =>{
        sessionStorage.setItem("appUnitId",id);

        props.history.push("/repositorypage/apptest/unitdetail")
    }


    const deleteFn = (id)=>{

        deleteAppUnit(id).then(()=>{
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
            <BreadcrumbCommon breadArray={["APP","测试用例"]}/>
            <div className='case-header'>
                <AppUnitEdit
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
                dataSource={appUnitList}
                rowKey = {record => record.id}
                pagination={false}
            />

        </>
    )


}

export default inject("appUnitStore","categoryStore")(observer(AppUnitList))