/*
 * @Description: 空间列表页
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:20:46
 */

import React, { Fragment, useEffect, useState } from 'react';
import { observer, inject } from "mobx-react";
import { Input, Table, Space, Popconfirm} from 'antd';
import RepositoryEdit from './repositoryEdit';
import  { useTranslation } from 'react-i18next'
import BreadcrumbEx from "../../common/breadcrumbEx";
import {getUser} from "tiklab-core-ui";

const RepositoryCreate = (props) => {
    const { repositoryStore ,repositoryRecentStore} = props;
    const {
        findRepositoryPage,
        deleteRepository,
        repositoryList,
        totalRecord,
    } = repositoryStore;
    const {repositoryRecent} = repositoryRecentStore;

    const { t } = useTranslation();


    //空间列表头
    const columns = [
        {
            title:`用例库名称`,
            dataIndex: "name",
            key: "name",
            // align:"center",
            render: (text,record) =>(
                <a onClick = {()=>toRepositoryDetail(record.id)}>{text}</a>
            )
        },
        {
            title:` ${t('tcId')}`,
            dataIndex: "id",
            key: "id",
            // align:"center",
        },
        {
            title: ` ${t('tcdesc')}`,
            dataIndex: "desc",
            key: "desc",
            // align:"center",
        },
        {
            title: ` ${t('tcoperation')}`,
            key: "action",
            align:"center",
            render: (text, record) => (
            <Space size="middle">
                <RepositoryEdit
                    name={`${t('tcedit')}`}
                    repositoryId={record.id}
                    findPage={findPage}
                />
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
    const userId = getUser().userId;

    useEffect(()=> {
        findPage().then(res=>{
            setTableLoading(false)
        });
    },[params])

    const findPage = async ()=>{
        let param = {
            userId:userId,
            ...params
        }
       await findRepositoryPage(param)
    }

    // 保存id到缓存,跳往详情页
    const toRepositoryDetail = (id) => {
        sessionStorage.setItem("repositoryId",id);

        //给左侧导航设置一个选择项
        localStorage.setItem("leftRouter","/repositorypage/detail")

        //最近空间
        let params = {
            repository: {id:id},
            userId:userId
        }
        repositoryRecent(params)


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
            <div className='search-btn'>
                <RepositoryEdit
                    className="important-btn"
                    name={`添加项目`}
                    findPage={findPage}
                />
                <Input
                    style={{width:200}}
                    placeholder={`${t('tcsearch')}`}
                    onPressEnter={onSearch}
                    className='search-input'
                />
            </div>

            <Table
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

export default inject('repositoryStore',"repositoryRecentStore")(observer(RepositoryCreate));
