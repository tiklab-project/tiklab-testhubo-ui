/*
 * @Description: 空间列表页
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:20:46
 */

import React, { Fragment, useEffect, useState } from 'react';
import { observer, inject } from "mobx-react";
import {Breadcrumb, Input, Table, Space, Popconfirm} from 'antd';
import CategoryEdit from './categoryEdit';
import  { useTranslation } from 'react-i18next'

const CategoryList = (props) => {
    const { categoryStore } = props;
    const {
        findCategoryListTreeTable,
        deleteCategory,
        categoryList
    } = categoryStore;

    const { t } = useTranslation();

    //空间列表头
    const columns = [
        {
            title:`模块名称`,
            dataIndex: "name",
            key: "name",
            // align:"center",
            width:'30%'
        },
        {
            title: ` ${t('tcdesc')}`,
            dataIndex: "desc",
            key: "desc",
            align:"center",
            width:'50%'
        },
        {
            title: ` ${t('tcoperation')}`,
            key: "action",
            align:"center",
            render: (text, record) => (
                <Space size="middle">
                    <CategoryEdit name='添加子模块'  categoryId={record.id} />
                    <CategoryEdit name={`${t('tcedit')}`}  categoryId={record.id} />
                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() =>deleteCategory(record.id)}
                        okText='确定'
                        cancelText='取消'
                    >
                        <a href="#" style={{color:'red'}}>{t('tcdelete')}</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ]
    const repositoryId = sessionStorage.getItem('repositoryId')
    const [tableLoading,setTableLoading] = useState(true)

    useEffect(()=> {
        findCategoryListTreeTable(repositoryId).then(res=>{
            setTableLoading(false)
        });
    },[repositoryId])



    return(
        <div className={"teston-page-center"}>
            <div className='breadcrumb'>
                <Breadcrumb separator=">"  >
                    <Breadcrumb.Item>仓库</Breadcrumb.Item>
                    <Breadcrumb.Item>模块管理</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className='search-btn'>
                <CategoryEdit name={`添加模块`} />
                <Input
                    placeholder={`${t('tcsearch')}`}
                    className='search-input'
                />
            </div>
             <Table
                className="tablelist"
                columns={columns}
                dataSource={categoryList}
                rowKey={record => record.id}
                // expandable={{defaultExpandAllRows: true}}
                loading={tableLoading}
             />


        </div>
    )
}

export default inject('categoryStore')(observer(CategoryList));
