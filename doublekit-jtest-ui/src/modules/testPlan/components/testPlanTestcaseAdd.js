/**
 * @description：
 * @date: 2021-08-20 17:00
 */
import React, {useEffect, useState} from 'react';
import { observer, inject } from "mobx-react";
import {Modal, Button, Table} from 'antd';

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
        },
        {
            title:`类型`,
            dataIndex: "type",
            key: "type",
            align:"center",
        },
        {
            title: `创建人`,
            dataIndex: ['user', 'name'],
            key: "user",
            align:"center",
        },
    ]

    const [pageSize] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [params, setParams] = useState({
        pageParam: {
            pageSize: pageSize,
            currentPage: currentPage
        }
    })
    const [visible, setVisible] = useState(false);
    const [selectRow,setSelectRow]=useState()
    const [tableLoading,setTableLoading] = useState(true);

    // 弹框展示
    const showModal = () => {
        setVisible(true)
    };

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
        debugger
        createTestPlanDetaillList(newData)
        setVisible(false)
    }

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
                width={600}
            >
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
