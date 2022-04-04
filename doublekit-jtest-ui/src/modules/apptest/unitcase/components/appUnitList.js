import React, {useEffect} from "react";
import {Input, Popconfirm, Space, Table} from "antd";
import BreadcrumbCommon from "../../../common/breadcrumbCommon";
import AppUnitEdit from "./appUnitEdit";
import {inject, observer} from "mobx-react";

const AppUnitList = (props) => {
    const {appUnitStore} = props;
    const {findAppUnitPage,appUnitList,deleteAppUnit}=appUnitStore;

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
                    <AppUnitEdit name={"编辑"}/>
                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() => deleteAppUnit(record.id)}
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
        findAppUnitPage()
    },[])

    const setSessionStorage = (id) =>{
        sessionStorage.setItem("funcUnitId",id);

        props.history.push("/repositorypage/apptest/unitdetail")
    }



    return(
        <>
            <BreadcrumbCommon breadArray={["WEB","测试用例"]}/>
            <div className='case-header'>
                <AppUnitEdit name={"添加用例"} btn={"btn"}/>
                <Input
                    placeholder={`搜索`}
                    // onPressEnter={onSearch}
                    className='search-input'
                    style={{width:240}}
                />
            </div>
            <Table
                columns={column}
                dataSource={appUnitList}
                rowKey = {record => record.id}
            />

        </>
    )


}

export default inject("appUnitStore")(observer(AppUnitList))