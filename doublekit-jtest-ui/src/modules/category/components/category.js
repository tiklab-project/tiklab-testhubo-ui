/*
 * @Description: 空间列表页
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:20:46
 */

import React, { Fragment, useEffect, useState } from 'react';
import { observer, inject } from "mobx-react";
import {Breadcrumb, Input, Table, Space, Button, Popconfirm} from 'antd';
import CategoryEdit from './categoryEdit';
import  { useTranslation } from 'react-i18next'

const CategoryList = (props) => {
    const { categoryStore } = props;
    const {
        findCategoryListTree,
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
    const repositoryId = localStorage.getItem('repositoryId')
    const [tableLoading,setTableLoading] = useState(true)

    useEffect(()=> {
        findCategoryListTree(repositoryId).then(res=>{
            setTableLoading(false)
        });
    },[repositoryId])



    return(
        <Fragment>
            <div className='breadcrumb'>
                <Breadcrumb separator=">"  >
                    <Breadcrumb.Item>仓库</Breadcrumb.Item>
                    <Breadcrumb.Item>模块管理</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className='search-btn'>
                <Input
                    placeholder={`${t('tcsearch')}`}
                    className='search-input'
                />
                <CategoryEdit name={`添加模块`} />
            </div>
             <Table
                bordered
                className="tablelist"
                columns={columns}
                dataSource={categoryList}
                rowKey={record => record.id}
                // expandable={{defaultExpandAllRows: true}}
                loading={tableLoading}
             />


        </Fragment>
    )
}

export default inject('categoryStore')(observer(CategoryList));
