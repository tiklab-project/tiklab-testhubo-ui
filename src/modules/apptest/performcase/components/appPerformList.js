import React, {useEffect, useState} from "react";
import {Input, Popconfirm, Space, Table} from "antd";
import {useTranslation} from "react-i18next";
import BreadcrumbCommon from "../../../common/breadcrumbCommon";
import AppPerformEdit from "./appPerformEdit";
import {inject, observer} from "mobx-react";

const AppPerformList = (props) =>{
    const { appPerformStore } = props;
    const {
        findAppPerformPage,
        deleteAppPerform,
        appPerformList,
        totalRecord
    } = appPerformStore;

    const { t } = useTranslation();

    //列表头
    const columns = [
        {
            title:`名称`,
            dataIndex: "name",
            key: "name",
            render: (text,record) =>(
                <a onClick = {()=>setLocalStorage(record.testType,record.id)}>{text}</a>
            )
        },
        {
            title: `类型`,
            dataIndex: "testType",
            key: "testType",
        },
        {
            title: `创建人`,
            dataIndex: ['createUser', 'name'],
            key: "user",
        },
        {
            title: ` ${t('tcoperation')}`,
            key: "action",
            align:"center",
            render: (text, record) => (
                <Space size="middle">
                    <div>
                        {/*<AppPerformEdit name="编辑"  appPerformId={record.id} />*/}
                    </div>
                    <Popconfirm
                        title="确定删除？"
                        // onConfirm={() =>deleteAppPerform(record.id)}
                        okText='确定'
                        cancelText='取消'
                    >
                        <a href="#" style={{color:'red'}}>{t('tcdelete')}</a>
                    </Popconfirm>
                </Space>
            ),
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
    const [tableLoading,setTableLoading] = useState(true);
    const categoryId = sessionStorage.getItem('categoryId')

    useEffect(()=> {
        findAppPerformPage("1")
    },[params])

    // 保存id到缓存
    const setLocalStorage = (type,id) => {
        sessionStorage.setItem('appPerformId',id);
        props.history.push('/repositorypage/apptest/performdetail')
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


    return(
        <div className={'inner-box'}>
            <BreadcrumbCommon breadArray={["APP","性能测试"]}/>
            <div className='case-header'>
                <Input
                    placeholder={`搜索`}
                    onPressEnter={onSearch}
                    className='search-input'
                />
                <AppPerformEdit  name='添加用例' btn={"btn"} />
            </div>

            <Table
                className="tablelist"
                columns={columns}
                dataSource={appPerformList}
                rowKey={record => record.id}
                pagination={{
                    current:currentPage,
                    pageSize:pageSize,
                    // total:totalRecord,
                }}
                onChange = {(pagination) => onTableChange(pagination)}
                // loading={tableLoading}
            />
        </div>
    )
}

export default inject("appPerformStore")(observer(AppPerformList));