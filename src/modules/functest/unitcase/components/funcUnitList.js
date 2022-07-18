import React, {useEffect} from "react";
import {Input, Popconfirm, Space, Table} from "antd";
import BreadcrumbCommon from "../../../common/breadcrumbCommon";
import {inject, observer} from "mobx-react";
import FuncUnitEdit from "./funcUnitEdit";

const FuncUnitList = (props) => {
    const {funcUnitStore,categoryStore} = props;
    const {findFuncUnitList,funcUnitList,deleteFuncUnit}=funcUnitStore;
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
            // align: 'center',
            width: "20%",
            render: (text, record) => (
                <Space size="middle">
                    <FuncUnitEdit
                        name={"编辑"}
                        funcUnitId={record.id}
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


    const findPage = ()=>{
        const param = {
            caseType:caseType,
            testType:testType,
            categoryId:categoryId
        }
        findFuncUnitList(param)
    }

    const setSessionStorage = (id) =>{
        sessionStorage.setItem("funcUnitId",id);

        props.history.push("/repositorypage/functest/unitdetail")
    }

    const deleteFn = (id)=>{

        deleteFuncUnit(id).then(()=>{
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
            <BreadcrumbCommon breadArray={["功能测试","测试用例"]}/>
            <div className='case-header'>
                <FuncUnitEdit
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
                dataSource={funcUnitList}
                rowKey = {record => record.id}
                pagination={false}
            />

        </>
    )


}

export default inject("funcUnitStore","categoryStore")(observer(FuncUnitList))