import React from "react";
import {Input, Popconfirm, Space, Table} from "antd";
import BreadcrumbCommon from "../../../common/breadcrumbCommon";
import ApiScenecaseEdit from "./apiScenecaseEdit";

const ApiScenecaseList = (props)=>{
    const column =[
        {
            title: '用例名称',
            dataIndex: 'name',
            key: 'name',
            // width: "30%",
            render: (text, record) => (
                <></>
                // <a onClick={() => setLocalStorage(record.id)}>{text}</a>
            )
        },{
            title: '类型',
            dataIndex: 'testType',
            key: 'testType',
            // width: "30%",
        },{
            title: '等级',
            dataIndex: 'level',
            key: 'level',
            // width: "20%",
        },{
            title: `创建人`,
            dataIndex: ['user', 'name'],
            key: "user",
        },{
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
            <BreadcrumbCommon breadArray={["API","场景用例"]}/>
            <div className='case-header'>
                <Input
                    placeholder={"查找"}
                    // onPressEnter={onSearch}
                    className='search-input'
                    style={{width:240}}
                />

                <ApiScenecaseEdit  name={"添加用例"} btn={"btn"}/>
            </div>
            <Table
                columns={column}
                // dataSource={}
                rowKey = {record => record.id}
            />
        </>
    )
}

export default ApiScenecaseList;
