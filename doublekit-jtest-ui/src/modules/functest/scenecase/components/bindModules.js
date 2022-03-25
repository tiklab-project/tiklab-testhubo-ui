import React, {useState} from "react";
import {inject,observer} from "mobx-react";
import {Button, Form, Input, Modal, Table} from "antd";

const BindModules = (props) => {
    const {categoryStore,testcaseStore} = props;
    const {findCategoryListTree,categoryList,} = categoryStore;
    const {releModule} = testcaseStore;
    const columns = [
        {
            title:`模块名称`,
            dataIndex: "name",
            key: "name",
            align:"center",
        },
        {
            title:`描述`,
            dataIndex: "desc",
            key: "desc",
            align:"center",
        }
    ]

    const [visible, setVisible] = useState(false);
    const [selectRow,setSelectRow]=useState()

    const repositoryId = localStorage.getItem('repositoryId');
    const testcaseId = localStorage.getItem('testcaseId')
    // 弹框展示
    const showModal = () => {
        findCategoryListTree(repositoryId)
        setVisible(true)
    };

    //提交
    const onFinish = () => {
        releModule(testcaseId,selectRow)
        setVisible(false)
    }

    const onCancel = () => { setVisible(false) };

    const rowSelection = {
        type:'radio',
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectRow(selectedRowKeys[0])
            console.log(selectedRowKeys, selectedRows)
        },
    };

    return(
        <>
            <a onClick={showModal}>关联模块</a>
            <Modal
                destroyOnClose={true}
                title='关联模块'
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
                    dataSource={categoryList}
                    rowKey={record => record.id}
                    rowSelection={{...rowSelection}}
                    pagination={false}
                />

            </Modal>
        </>
    )
}

export default inject('categoryStore','testcaseStore')(observer(BindModules))