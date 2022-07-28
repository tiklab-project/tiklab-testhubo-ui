/*
 * @Description: 空间列表页
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:20:46
 */

import React, { Fragment, useEffect, useState } from 'react';
import { observer, inject } from "mobx-react";
import {Breadcrumb, Input, Table, Space, Button, Popconfirm} from 'antd';
import RepositoryEdit from './repositoryEdit';
import  { useTranslation } from 'react-i18next'
// import {execute,md5} from '../../../../dk/dk'

const RepositoryList = (props) => {
    const { repositoryStore } = props;
    const {
        findRepositoryPage,
        deleteRepository,
        repositoryList,
        totalRecord,
    } = repositoryStore;

    const { t } = useTranslation();


    // let json = execute('dk.md5("b")')

    // console.log(json)

    //空间列表头
    const columns = [
        {
            title:`用例库名称`,
            dataIndex: "name",
            key: "name",
            align:"center",
            render: (text,record) =>(
                <a onClick = {()=>toRepositoryDetail(record.id)}>{text}</a>
            )
        },
        {
            title:` ${t('tcId')}`,
            dataIndex: "id",
            key: "id",
            align:"center",
        },
        {
            title: ` ${t('tcdesc')}`,
            dataIndex: "desc",
            key: "desc",
            align:"center",
        },
        {
            title: ` ${t('tcoperation')}`,
            key: "action",
            align:"center",
            render: (text, record) => (
            <Space size="middle">
                <div>
                    <RepositoryEdit name={`${t('tcedit')}`}  repositoryId={record.id} />
                </div>
                <Popconfirm
                    title="确定删除？"
                    onConfirm={() =>deleteRepository(record.id)}
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
    const [tableLoading,setTableLoading] = useState(true)

    useEffect(()=> {
        findRepositoryPage(params).then(res=>{
            setTableLoading(false)
        });
    },[params])

    // 保存id到缓存,跳往详情页
    const toRepositoryDetail = (id) => {
        sessionStorage.setItem("repositoryId",id);

        //给左侧导航设置一个选择项
        localStorage.setItem("leftRouter","/repositorypage/detail")

        props.history.push('/repositorypage');
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
        <Fragment>
            <div className='breadcrumb'>
                <Breadcrumb separator=">"  >
                    <Breadcrumb.Item>用例库</Breadcrumb.Item>
                    <Breadcrumb.Item>用例库</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className='search-btn'>
                <Input
                    style={{width:200}}
                    placeholder={`${t('tcsearch')}`}
                    onPressEnter={onSearch}
                    className='search-input'
                />
                <RepositoryEdit className="important-btn" name={`添加项目`}/>
            </div>

            <Table
                bordered
                className="tablelist"
                columns={columns}
                dataSource={repositoryList}
                rowKey={record => record.id}
                pagination={{
                    current:currentPage,
                    pageSize:pageSize,
                    total:totalRecord,
                }}
                onChange = {(pagination) => onTableChange(pagination)}
                loading={tableLoading}
            />
        </Fragment>
    )
}

export default inject('repositoryStore')(observer(RepositoryList));
