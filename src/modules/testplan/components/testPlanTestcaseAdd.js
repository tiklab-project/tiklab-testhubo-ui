/**
 * @description：测试计划中关联用例
 * @date: 2021-08-20 17:00
 */
import React, {useEffect, useState} from 'react';
import { observer, inject } from "mobx-react";
import {Modal, Button, Table, Input} from 'antd';

// 添加与编辑
const TestPlanTestcaseAdd = (props) => {
    const { testPlanDetailStore,testPlanId} = props;
    const {findTesCaseList,findBindTestCaseList,testPlanTestcaseList,createTestPlanDetailList,tcTotalRecord} = testPlanDetailStore;

    const columns = [
        {
            title:`名称`,
            dataIndex: "name",
            key: "name",
            width:'40%'
        },
        {
            title:`测试类型`,
            dataIndex: "type",
            key: "type",
            width:'30%',
            render:(text,record)=>(showTestType(record.testType))
        },
        {
            title:`用例类型`,
            dataIndex: "type",
            key: "type",
            width:'30%',
            render:(text,record)=>(showCaseType(record.caseType))
        },
    ]

    const [tableLoading,setTableLoading] = useState(true);
    const [pageSize] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);
    const [params, setParams] = useState({
        pageParam: {
            pageSize: pageSize,
            currentPage: currentPage
        }
    })
    const [visible, setVisible] = useState(false);
    const [selectRow,setSelectRow]=useState()

    let repositoryId = sessionStorage.getItem("repositoryId")

    // 弹框展示
    const showModal = () => {
        findTesCaseList(repositoryId,testPlanId,params).then(()=>
            setTableLoading(false)
        )

        setVisible(true)
    };


    //提交
    const onFinish = () => {
        let newData = []
        selectRow&&selectRow.map(item=>{
            let obj={
                testPlan:{id: testPlanId},
                testCase: {id:item}
            }
            newData.push(obj)
        })
        createTestPlanDetailList(newData).then(()=>findBindTestCaseList(testPlanId))
        setVisible(false)
    }

    const showTestType = (testType)=>{
        switch (testType) {
            case "api":
                return "API";
            case "web":
                return "WEB";
            case "app":
                return "APP";
            case "func":
                return "功能";
        }
    }

    const showCaseType = (caseType)=>{
        switch (caseType) {
            case "unit":
                return "单元测试";
            case "scene":
                return "场景测试";
            case "perform":
                return "压力测试";
        }
    }


    // 关闭弹框
    const onCancel = () => { setVisible(false) };

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectRow(selectedRowKeys)
            console.log(selectedRowKeys, selectedRows)
        },
    };

    //分页
    const onTableChange = (pagination) => {
        setCurrentPage(pagination.current)
        const newParams = {
            ...params,
            pageParam: {
                pageSize: pageSize,
                currentPage: pagination.current
            },
        }
        setParams(newParams)
    }

    //搜索
    const onSearch = (e) => {
        setCurrentPage(1)
        let newParams = {
            pageParam: {
                pageSize: pageSize,
                currentPage: 1
            },
        }
        if (e.target.value) {
            newParams = {
                pageParam: {
                    pageSize: pageSize,
                    currentPage: 1
                },
                name:e.target.value,
            }
        }
        setParams(newParams)
    }


    return (
        <>
            <Button className="important-btn" onClick={showModal}>添加用例</Button>
            <Modal
                destroyOnClose={true}
                title='添加用例'
                visible={visible}
                onCancel={onCancel}
                onOk={onFinish}
                okText="提交"
                cancelText="取消"
                centered
                width={800}
            >

                {/*<Input*/}
                {/*    placeholder={`搜索名字`}*/}
                {/*    onPressEnter={onSearch}*/}
                {/*    className='search-input'*/}
                {/*/>*/}

                <Table
                    className="tablelist"
                    columns={columns}
                    dataSource={testPlanTestcaseList}
                    rowKey={record => record.id}
                    rowSelection={{...rowSelection}}
                    pagination={{
                        current:currentPage,
                        pageSize:pageSize,
                        total:tcTotalRecord,
                    }}
                    onChange = {(pagination) => onTableChange(pagination)}
                    loading={tableLoading}
                />
            </Modal>
        </>
    );
};

export default inject('testPlanDetailStore',)(observer(TestPlanTestcaseAdd));
