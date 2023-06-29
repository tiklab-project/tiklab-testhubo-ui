/**
 * @description：测试计划中关联用例
 * @date: 2021-08-20 17:00
 */
import React, { useState} from 'react';
import { observer, inject } from "mobx-react";
import {Modal, Table, Space, Select,} from 'antd';
import IconBtn from "../../common/iconBtn/IconBtn";
import {showCaseTypeView, showTestTypeView} from "../../common/caseCommon/CaseCommonFn";
import testPlanDetailStore from "../store/testPlanDetailStore";

// 添加与编辑
const TestPlanBindCaseModal = (props) => {
    const {testPlanId,testcaseStore} = props;
    const {findBindTestCaseList,planBindCase} = testPlanDetailStore;
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
            dataIndex: "testType",
            key: "testType",
            width:'30%',
            render:(text,record)=>(showTestTypeView(record.testType))
        },
        {
            title:`用例类型`,
            dataIndex: "caseType",
            key: "caseType",
            width:'30%',
            render:(text,record)=>(showCaseTypeView(record.caseType))
        },
    ]


    const [tableLoading,setTableLoading] = useState(true);

    const [totalRecord, setTotalRecord] = useState();
    const [pageSize] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);

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
        planBindCase(newData).then(()=>findBindTestCaseList(testPlanId))
        setVisible(false)
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
                            },{
                                value: 'ui',
                                label: 'UI',
                            },
                            {
                                value: 'perform',
                                label: '性能',
                            },{
                                value: 'function',
                                label: '功能',
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

export default inject("testcaseStore")(observer(TestPlanBindCaseModal));
