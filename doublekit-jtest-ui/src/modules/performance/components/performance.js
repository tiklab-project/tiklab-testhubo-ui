/**
 * @description：
 * @date: 2021-08-24 15:17
 */
import React, { useEffect, useState } from 'react';
import { observer, inject } from "mobx-react";
import {Breadcrumb, Input, Table, Space, Popconfirm,Row,Col} from 'antd';
import PerformanceEdit from './performanceEdit';
import  { useTranslation } from 'react-i18next'

const PerformanceList = (props) => {
    const { performanceStore } = props;
    const {
        findPerformancePage,
        deletePerformance,
        performanceList,
        totalRecord
    } = performanceStore;

    const { t } = useTranslation();

    //列表头
    const columns = [
        {
            title:`名称`,
            dataIndex: "name",
            key: "name",
            align:"center",
            render: (text,record) =>(
                <a onClick = {()=>setLocalStorage('performanceId',record.id)}>{text}</a>
            )
        },
        {
            title: `线程数`,
            dataIndex: "threadCount",
            key: "threadCount",
            align:"center",
        },
        {
            title: `执行次数`,
            dataIndex: "executeCount",
            key: "executeCount",
            align:"center",
        },
        {
            title: `创建人`,
            dataIndex: ['user', 'name'],
            key: "user",
            align:"center",
        },
        {
            title: `测试时间`,
            dataIndex: "time",
            key: "time",
            align:"center",
        },
        {
            title: ` ${t('tcoperation')}`,
            key: "action",
            align:"center",
            render: (text, record) => (
                <Space size="middle">
                    <div>
                        <PerformanceEdit name="编辑"  performanceId={record.id} />
                    </div>
                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() =>deletePerformance(record.id)}
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
    const repositoryId = localStorage.getItem('repositoryId')

    useEffect(()=> {
        findPerformancePage(repositoryId,params).then(()=>{
            setTableLoading(false)
        });
    },[params])

    // 保存id到缓存
    const setLocalStorage = (performanceId,id) => {
        localStorage.setItem('performanceId',id);
        props.history.push('/performanceDetail');
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
            <div className='breadcrumb'>
                <Breadcrumb separator=">" >
                    <Breadcrumb.Item>仓库</Breadcrumb.Item>
                    <Breadcrumb.Item>性能测试列表</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className='search-btn'>
                <Input
                    placeholder={`搜索`}
                    onPressEnter={onSearch}
                    className='search-input'
                />
                <PerformanceEdit className="important-btn" name='添加' {...props}/>
            </div>

            <Table
                className="tablelist"
                columns={columns}
                dataSource={performanceList}
                rowKey={record => record.id}
                pagination={{
                    current:currentPage,
                    pageSize:pageSize,
                    total:totalRecord,
                }}
                onChange = {(pagination) => onTableChange(pagination)}
                loading={tableLoading}
            />
        </div>
    )
}

export default inject('performanceStore')(observer(PerformanceList));
