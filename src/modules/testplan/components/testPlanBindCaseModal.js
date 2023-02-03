/**
 * @description：测试计划中关联用例
 * @date: 2021-08-20 17:00
 */
import React, { useState} from 'react';
import { observer, inject } from "mobx-react";
import {Modal, Button, Table, Space, Select,} from 'antd';
import IconBtn from "../../common/iconBtn/IconBtn";

// 添加与编辑
const TestPlanBindCaseModal = (props) => {
    const { testPlanDetailStore,testPlanId,testcaseStore} = props;
    const {findBindTestCaseList,createTestPlanDetailList} = testPlanDetailStore;
    const {findTestCaseList,testcaseList} = testcaseStore;


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

    const [totalRecord, setTotalRecord] = useState();
    const [pageSize] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);
    // const [pageParam, setPageParam] = useState({
    //     pageParam: {
    //         pageSize: pageSize,
    //         currentPage: currentPage
    //     }
    // })

    const [visible, setVisible] = useState(false);
    const [selectRow,setSelectRow]=useState()

    let repositoryId = sessionStorage.getItem("repositoryId")

    // 弹框展示
    const showModal = () => {
        let params = {
            pageParam: {
                pageSize: 8,
                currentPage: 1
            }
        }
        findPage(params)
        setVisible(true)
    };

    const findPage = (params) =>{
        let values = {
            repositoryId:repositoryId,
            ...params
        }
        findTestCaseList(values).then((res)=>{
            setTotalRecord(res.totalRecord)
            setTableLoading(false)
        })
    }


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
            pageParam: {
                pageSize: 8,
                currentPage: pagination.current
            },
        }

        findPage(newParams)
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
        // setPageParam(newParams)
    }

    //测试类型筛选
    const testTypeFn = (type)=>{
        let params = {
            testType:type,
            pageParam: {
                pageSize: 8,
                currentPage: 1
            }
        }
        findPage(params)
    }

    //用例类型筛选
    const caseSelectFn = (type) =>{
        let params = {
            caseType:type,
            pageParam: {
                pageSize: 8,
                currentPage: 1
            }
        }
        findPage(params)
    }


    return (
        <>
            <IconBtn
                className="pi-icon-btn-grey"
                name={"关联用例"}
                onClick={showModal}
            />
            <Modal
                destroyOnClose={true}
                title='关联用例'
                visible={visible}
                onCancel={onCancel}
                onOk={onFinish}
                okText="提交"
                cancelText="取消"
                centered
                width={960}
            >

                <Space style={{margin:"0 0 10px 0"}}>
                    <Select
                        // defaultValue={null}
                        placeholder={"测试类型"}
                        className={"bind-case-select"}
                        onChange={testTypeFn}
                        style={{width:120}}
                        options={[
                            {
                                value: null,
                                label: '所有',
                            },{
                                value: 'api',
                                label: '接口',
                            },
                            {
                                value: 'web',
                                label: 'WEB',
                            },{
                                value: 'app',
                                label: 'APP',
                            },{
                                value: 'func',
                                label: '功能',
                            },
                        ]}
                    />
                    <Select
                        // defaultValue={null}
                        placeholder={"用例类型"}
                        className={"bind-case-select"}
                        onChange={caseSelectFn}
                        style={{width:120}}
                        options={[
                            {
                                value: null,
                                label: '所有',
                            },{
                                value: 'unit',
                                label: '单元用例',
                            },
                            {
                                value: 'scene',
                                label: '场景用例',
                            },{
                                value: 'perform',
                                label: '性能用例',
                            },
                        ]}
                    />
                </Space>

                <div className={"table-list-box"}>
                    <Table
                        columns={columns}
                        dataSource={testcaseList}
                        rowKey={record => record.id}
                        rowSelection={{...rowSelection}}
                        pagination={{
                            current:currentPage,
                            pageSize:pageSize,
                            total:totalRecord,
                        }}
                        onChange = {(pagination) => onTableChange(pagination)}
                        loading={tableLoading}
                    />
                </div>
            </Modal>
        </>
    );
};

export default inject('testPlanDetailStore',"testcaseStore")(observer(TestPlanBindCaseModal));
