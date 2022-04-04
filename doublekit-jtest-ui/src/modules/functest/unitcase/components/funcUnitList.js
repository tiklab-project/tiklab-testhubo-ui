import React, {useEffect} from "react";
import {Input, Popconfirm, Space, Table} from "antd";
import BreadcrumbCommon from "../../../common/breadcrumbCommon";
import {inject, observer} from "mobx-react";
import FuncUnitEdit from "./funcUnitEdit";

const FuncUnitList = (props) => {
    const {funcUnitStore} =props;
    const {findFuncUnitPage,funcUnitList} = funcUnitStore;

    const column = [
        {
            title:`用例名称`,
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
                        <FuncUnitEdit name={"编辑"}/>
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

    useEffect(()=>{
        findFuncUnitPage()
    },[])

    const setSessionStorage = (id) =>{
        sessionStorage.setItem("funcUnitId",id);

        props.history.push("/repositorypage/functest/unitdetail")
    }


    return(
        <>
            <BreadcrumbCommon breadArray={["功能测试","测试用例"]}/>
            <div className='case-header'>
                <FuncUnitEdit name={"添加用例"} btn={"btn"}/>
                <Input
                    placeholder={`搜索`}
                    // onPressEnter={onSearch}
                    className='search-input'
                    style={{width:240}}
                />
            </div>
            <Table
                columns={column}
                dataSource={funcUnitList}
                rowKey = {record => record.id}
            />

        </>
    )


}

export default inject("funcUnitStore")(observer(FuncUnitList))