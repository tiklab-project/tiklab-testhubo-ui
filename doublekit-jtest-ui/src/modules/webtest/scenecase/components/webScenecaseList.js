import React from "react";
import {Input, Popconfirm, Space, Table} from "antd";
import BreadcrumbCommon from "../../../common/breadcrumbCommon";
import WebScenecaseEdit from "./webScenecaseEdit";

const WebScenecaseList = (props) => {

    const column = [
        {
            title: '用例名称',
            dataIndex: 'name',
            key: 'name',
            width: "30%",
            render: (text, record) => (
                <></>
                // <a onClick={() => setLocalStorage(record.id)}>{text}</a>
            )
        },
        {
            title: '请求路径',
            dataIndex: 'baseUrl',
            key: 'baseUrl',
            width: "20%",
        },
        {
            title: '路径',
            dataIndex: ['method', 'path'],
            key: 'method',
            width: "20%",
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
                <WebScenecaseEdit name={"添加用例"} btn={"btn"}/>
            </div>
            <Table
                columns={column}
                // dataSource={}
                rowKey = {record => record.id}
            />

        </>
    )


}

export default WebScenecaseList