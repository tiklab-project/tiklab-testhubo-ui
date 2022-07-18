import React, {useEffect} from "react";
import {Input, Popconfirm, Space, Table} from "antd";
import BreadcrumbCommon from "../../../common/breadcrumbCommon";
import WebUnitEdit from "./webUnitEdit";
import {inject, observer} from "mobx-react";

const WebUnitList = (props) => {
    const {webUnitStore,categoryStore} = props;
    const {findWebUnitList,webUnitList,deleteWebUnit}=webUnitStore;
    const {findCategoryListTree}=categoryStore;

    const column = [
        {
            title:`用例名称`,
            dataIndex:  ['testCase',"name"],
            key: "name",
        },
        {
            title: '操作方法',
            width: '15%',
            dataIndex: 'actionType',
            align:'center',
        },
        {
            title: '参数',
            width: '15%',
            dataIndex: 'parameter',
            align:'center',
        },
        {
            title: '定位器',
            dataIndex: 'location',
            width: '15%',
            align:'center',
        },
        {
            title: '定位器的值',
            dataIndex: 'locationValue',
            width: '15%',
            align:'center',
        },

        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align: 'center',
            width: "20%",
            render: (text, record) => (
                <Space size="middle">
                    <WebUnitEdit
                        name={"编辑"}
                        type={"edit"}
                        webUnitId={record.id}
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
        findWebUnitList(param)
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
                />

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