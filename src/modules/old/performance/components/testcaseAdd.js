/**
 * @description：
 * @date: 2021-08-25 09:56
 */
import React, {useState} from 'react';
import { observer, inject } from "mobx-react";
import {Modal, Button, Table} from 'antd';


// 添加与编辑
const TestcaseAdd = (props) => {
    const { performanceStore, repositoryId, testType } = props;
    const {findTestCaseByType,testcaseList,testRecord,getTestcase} = performanceStore;

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

    // 弹框展示
    const showModal = () => {
        findTestCaseByType(repositoryId,testType)
        setVisible(true)
    };

    //提交
    const onFinish = () => {
        getTestcase(selectRow)
        setVisible(false)
    }

    //取消
    const onCancel = () => setVisible(false) ;

    const rowSelection = {
        type:'radio',
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectRow(selectedRows[0])
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
            <a  onClick={showModal}>关联</a>
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
                    dataSource={testcaseList}
                    rowKey={record => record.id}
                    rowSelection={{...rowSelection}}
                    pagination={{
                        current:currentPage,
                        pageSize:pageSize,
                        total:testRecord,
                    }}
                    onChange = {(pagination) => onTableChange(pagination)}
                />


            </Modal>
        </>
    );
};

export default inject('performanceStore')(observer(TestcaseAdd));
