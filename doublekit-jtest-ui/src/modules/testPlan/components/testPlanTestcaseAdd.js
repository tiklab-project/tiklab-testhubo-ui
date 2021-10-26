/**
 * @description：
 * @date: 2021-08-20 17:00
 */
import React, {useEffect, useState} from 'react';
import { observer, inject } from "mobx-react";
import {Modal, Button, Table, Input} from 'antd';

// 添加与编辑
const TestPlanTestcaseAdd = (props) => {
    const { testPlanDetailStore,testPlanId} = props;
    const {findTesCase,testPlanTestcaseList,createTestPlanDetaillList,tcTotalRecord} = testPlanDetailStore;

    const columns = [
        {
            title:`名称`,
            dataIndex: "name",
            key: "name",
            align:"center",
            width:'25%'
        },
        {
            title:`类型`,
            dataIndex: "type",
            key: "type",
            align:"center",
            width:'20%'
        },
        {
            title: `创建人`,
            dataIndex: ['user', 'name'],
            key: "user",
            align:"center",
            width:'20%'
        },
        {
            title: `描述`,
            dataIndex: 'desc',
            key: "desc",
            align:"center",
            width:'30%'
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

    useEffect(()=>{
        findTesCase(testPlanId,params).then(()=>
            setTableLoading(false)
        )
    },[testPlanId,params])

    //提交
    const onFinish = () => {
        let newData = []
        selectRow&&selectRow.map(item=>{
            let obj={
                testPlan:{id: testPlanId},
                testCase:item
            }
            newData.push(obj)
        })
        createTestPlanDetaillList(newData)
        setVisible(false)
    }

    // 弹框展示
    const showModal = () => { setVisible(true)};
    // 关闭弹框
    const onCancel = () => { setVisible(false) };

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectRow(selectedRows)
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
                <div>
                    <Input
                        placeholder={`搜索名字`}
                        onPressEnter={onSearch}
                        className='search-input'
                    />
                </div>
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

export default inject('testPlanDetailStore')(observer(TestPlanTestcaseAdd));
