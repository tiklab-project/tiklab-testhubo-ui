import React, {useEffect} from "react";
import {Input, Popconfirm, Space, Table} from "antd";
import BreadcrumbCommon from "../../../common/breadcrumbCommon";
import WebUnitEdit from "./webUnitEdit";
import {inject, observer} from "mobx-react";

const WebUnitList = (props) => {
    const {webUnitStore} = props;
    const {findWebUnitPage,webUnitList,deleteWebUnit}=webUnitStore;

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
                    <WebUnitEdit name={"编辑"}/>
                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() => deleteWebUnit(record.id)}
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
        findWebUnitPage()
    },[])

    const setSessionStorage = (id) =>{
        sessionStorage.setItem("funcUnitId",id);

        props.history.push("/repositorypage/webtest/unitdetail")
    }



    return(
        <>
            <BreadcrumbCommon breadArray={["WEB","测试用例"]}/>
            <div className='case-header'>
                <WebUnitEdit name={"添加用例"} btn={"btn"}/>
                <Input
                    placeholder={`搜索`}
                    // onPressEnter={onSearch}
                    className='search-input'
                    style={{width:240}}
                />
            </div>
            <Table
                columns={column}
                dataSource={webUnitList}
                rowKey = {record => record.id}
            />

        </>
    )


}

export default inject("webUnitStore")(observer(WebUnitList))