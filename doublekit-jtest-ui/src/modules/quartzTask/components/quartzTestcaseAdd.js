/**
 * @description：
 * @date: 2021-08-20 17:00
 */
import React, {useState} from 'react';
import { observer, inject } from "mobx-react";
import {Modal, Button, Input, Table, Space, Popconfirm} from 'antd';


// 添加与编辑
const QuartzTestcaseAdd = (props) => {
    const { quartzTestcaseStore,quartzType } = props;
    const {findRepositoryTestcaseList,repositoryTestcaseList,createQuartzTestcase} = quartzTestcaseStore;

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

    const [visible, setVisible] = useState(false);
    const [selectRow,setSelectRow]=useState()

    const repositoryId = localStorage.getItem('repositoryId')
    const quartzMasterId = localStorage.getItem('quartzMasterId')
    // 弹框展示
    const showModal = () => {
        const param = {
            repositoryId:repositoryId,
            quartzType:quartzType
        }
        findRepositoryTestcaseList(param)
        setVisible(true)
    };

    //提交
    const onFinish = () => {
        let newData = []
        selectRow&&selectRow.map(item=>{
            let obj={
                quartzMaster:{id: quartzMasterId},
                testCase:item
            }
            newData.push(obj)
        })
        createQuartzTestcase(newData)
        setVisible(false)
    }

    const onCancel = () => { setVisible(false) };

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectRow(selectedRows)
            console.log(selectedRowKeys, selectedRows)
        },
    };

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
                    dataSource={repositoryTestcaseList}
                    rowKey={record => record.id}
                    rowSelection={{...rowSelection}}
                    pagination={false}
                />


            </Modal>
        </>
    );
};

export default inject('quartzTestcaseStore')(observer(QuartzTestcaseAdd));
