/**
 * @description：
 * @date: 2021-08-18 16:53
 */
import React, { Fragment, useEffect, useState } from 'react';
import { observer, inject } from "mobx-react";
import {Breadcrumb, Input, Table, Space, Popconfirm} from 'antd';
import QuartzMasterEdit from './quartzMasterEdit';
import  { useTranslation } from 'react-i18next';
import './quartz.scss'

const QuartzMasterList = (props) => {
    const { quartzMasterStore } = props;
    const {
        findQuartzMasterPage,
        deleteQuartzMaster,
        quartzMasterList,
        totalRecord,
    } = quartzMasterStore;

    const { t } = useTranslation();

    //空间列表头
    const columns = [
        {
            title:`名称`,
            dataIndex: "name",
            key: "name",
            align:"center",
            render: (text,record) =>(
                <a onClick = {()=>setLocalStorage('quartzMasterId',record.id)}>{text}</a>
            )
        },
        {
            title:`任务类型`,
            dataIndex: "quartzType",
            key: "quartzType",
            align:"center",
        },
        {
            title:`执行类型`,
            dataIndex: "type",
            key: "type",
            align:"center",
            render: (text, record) => (
                text==='0'?"指定时间":"循环"    //0:指定时间  1:循环
            )
        },
        {
            title: `执行时间`,
            dataIndex: "executionTimes",
            key: "executionTimes",
            align:"center",
        },
        {
            title: `用例数`,
            dataIndex: "caseNumber",
            key: "caseNumber",
            align:"center",
        },
        {
            title: `状态`,  //0暂停  1.进行中  2.已结束
            dataIndex: "state",
            key: "state",
            align:"center",
            render: (text, record) => (stateView(record.state))
        },
        {
            title: ` ${t('tcoperation')}`,
            key: "action",
            align:"center",
            render: (text, record) => (
                <Space size="middle">
                    <div>
                        <QuartzMasterEdit name='编辑'  quartzMasterId={record.id} />
                    </div>
                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() =>deleteQuartzMaster(record.id)}
                        okText='确定'
                        cancelText='取消'
                    >
                        <a href="#" style={{color:'red'}}>{t('tcdelete')}</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ]

    //表格状态例 根据返回字段渲染 0:暂停 1:进行中 2:已结束
    const stateView = (data) => {
        switch (data){
            case 0 :
                return "暂停";
            case 1 :
                return "进行中";
            case 2 :
                return "已结束";
        }
    }

    const [pageSize] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [params, setParams] = useState({
        pageParam: {
            pageSize: pageSize,
            currentPage: currentPage
        }
    })
    const [tableLoading,setTableLoading] = useState(true)
    const repositoryId = localStorage.getItem('repositoryId')

    useEffect(()=> {
        findQuartzMasterPage(repositoryId,params).then(()=>{
            setTableLoading(false)
        });
    },[repositoryId,params])

    // 保存id到缓存
    const setLocalStorage = (quartzMasterId,id) => {
        localStorage.setItem(quartzMasterId,id);
        props.history.push('/repository/quartzTask');
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
                    <Breadcrumb.Item>仓库</Breadcrumb.Item>
                    <Breadcrumb.Item>定时任务</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className='search-btn'>
                <Input
                    placeholder={`搜索`}
                    onPressEnter={onSearch}
                    className='search-input'
                />
                <QuartzMasterEdit btn={'btn'} name={`添加任务`} {...props}/>
            </div>

            <Table
                className="tablelist"
                columns={columns}
                dataSource={quartzMasterList}
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

export default inject('quartzMasterStore')(observer(QuartzMasterList));
