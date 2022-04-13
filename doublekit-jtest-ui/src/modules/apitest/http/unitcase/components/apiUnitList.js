import React, {useEffect} from "react";
import {Input, Popconfirm, Space, Table} from "antd";
import BreadcrumbCommon from "../../../../common/breadcrumbCommon";
import ApiUnitEdit from "./apiUnitEdit";
import {inject, observer} from "mobx-react";

const ApiUnitList = (props) => {
    const {apiUnitStore} = props;
    const {findApiUnitPage, apiUnitList,deleteApiUnit} = apiUnitStore;

    const column = [
        {
            title: '用例名称',
            dataIndex: ["testCase",'name'],
            key: 'name',
            width: "30%",
            render: (text, record) => (
                <a onClick={() => setSessionStorage(record.id)}>{text}</a>
            )
        },
        {
            title: '请求路径',
            dataIndex: 'methodType',
            key: 'baseUrl',
            width: "20%",
        },
        {
            title: '路径',
            dataIndex:  'path',
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
                        <ApiUnitEdit name={"编辑"} apiUnitId={record.id}/>
                    </div>
                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() => deleteApiUnit(record.id)}
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

    useEffect(()=>{
        const param = {
            caseType:caseType,
            testType:testType,
            categoryId:categoryId
        }
        findApiUnitPage(param)
    },[categoryId])



    const setSessionStorage = (id) =>{
        sessionStorage.setItem("apiUnitId",id);

        props.history.push("/repositorypage/apitest/unitdetail")
    }



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
                <ApiUnitEdit name={"添加用例"} btn={"btn"}/>
            </div>
            <Table
                columns={column}
                dataSource={apiUnitList}
                rowKey = {record => record.id}
            />

        </>
    )


}

export default inject("apiUnitStore")(observer(ApiUnitList))