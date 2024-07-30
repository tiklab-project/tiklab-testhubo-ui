import React, {useEffect, useState} from "react";
import {observer} from "mobx-react";
import {Input, Modal, Table} from "antd";
import userSelectStore from "../store/UserSelectStore";
import {debounce} from "../../utils/commonFn";

const columns = [
    {
        title: `姓名`,
        dataIndex: "name",
        key: "name",
        align:"center",
    },{
        title: `手机`,
        dataIndex: "phone",
        key: "phone",
        align:"center",
    },{
        title: `邮箱`,
        dataIndex: "email",
        key: "email",
        align:"center",
    },{
        title: `类型`,
        dataIndex: "userType",
        key: "userType",
        align:"center",
        render: (text,record) =>(text===1?'内部':'第三方')
    },
]

/**
 * 用户选择下拉框
 */
const UserSelect =(props) =>{
    const {findUserSelectPage,userSelectList,totalRecord,getUserId} = userSelectStore;

    const [tableLoading,setTableLoading] = useState(true);
    const [pageSize] = useState(10);
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
        findUserSelectPage(params).then(()=>{
            setTableLoading(false)
        })
    },[params])

    const rowSelection = {
        type:'radio',
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectRow(selectedRowKeys[0])
            console.log(selectedRowKeys, selectedRows)
        },
    };

    //提交
    const onFinish = () => {
        getUserId(selectRow)
        setVisible(false)
    }

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

    // 弹框展示
    const showModal = () => { setVisible(true)};
    // 关闭弹框
    const onCancel = () => { setVisible(false) };

    return(
        <>
            <a onClick={showModal}>待认领</a>
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
                <Input
                    placeholder={`搜索`}
                    onPressEnter={onSearch}
                    className='search-input'
                    onChange={debounce(onSearch,500) }
                    allowClear
                />
                <Table
                    className="tablelist"
                    columns={columns}
                    dataSource={userSelectList}
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
            </Modal>
        </>
    )
}

export default observer(UserSelect);