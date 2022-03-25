import React from "react";
import {Input, Popconfirm, Space, Table} from "antd";
import BreadcrumbCommon from "../../../common/breadcrumbCommon";
import AppUnitcaseEdit from "./appUnitcaseEdit";

const AppUnitcaseList = (props) => {

    const column = [
        {
            title:`名称`,
            dataIndex: "name",
            key: "name",
            render: (text,record) =>(
                <></>
                // <a onClick = {()=>setLocalStorage(record.testType,record.id)}>{text}</a>
            )
        },
        {
            title: `类型`,
            dataIndex: "testType",
            key: "testType",
        },
        {
            title: `创建人`,
            dataIndex: ['user', 'name'],
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
                        <div>编辑</div>
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


    return(
        <>
            <BreadcrumbCommon breadArray={["API","测试用例"]}/>
            <div className='case-header'>
                <Input
                    placeholder={`搜索`}
                    // onPressEnter={onSearch}
                    className='search-input'
                    style={{width:240}}
                />
                <AppUnitcaseEdit name={"添加用例"} btn={"btn"}/>
            </div>
            <Table
                columns={column}
                // dataSource={}
                rowKey = {record => record.id}
            />

        </>
    )


}

export default AppUnitcaseList