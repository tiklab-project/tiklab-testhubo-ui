/*
 * @Description: 空间列表页
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:20:46
 */

import React, { useEffect, useState } from 'react';
import { observer, inject } from "mobx-react";
import { Table, Space, Popconfirm} from 'antd';
import RepositoryEdit from './RepositoryEdit';
import { useTranslation } from 'react-i18next'
import {getUser} from "tiklab-core-ui";

const RepositoryCreate = (props) => {
    const { repositoryStore ,repositoryRecentStore} = props;
    const {
        findRepositoryList,
        deleteRepository,
        repositoryList,
    } = repositoryStore;
    const {repositoryRecent} = repositoryRecentStore;

    const { t } = useTranslation();


    //空间列表头
    const columns = [
        {
            title:`用例库名称`,
            dataIndex: "name",
            key: "name",
            render: (text,record) =>(
                <a onClick = {()=>toRepositoryDetail(record.id)}>{text}</a>
            )
        },
        {
            title:` ${t('tcId')}`,
            dataIndex: "id",
            key: "id",
        },
        {
            title: ` ${t('tcdesc')}`,
            dataIndex: "desc",
            key: "desc",
        },
        {
            title: ` ${t('tcoperation')}`,
            key: "action",
            render: (text, record) => (
            <Space size="middle">
                <RepositoryEdit
                    name={`${t('tcedit')}`}
                    repositoryId={record.id}
                />
                <Popconfirm
                    title="确定删除？"
                    onConfirm={() =>deleteRepository(record.id).then(()=> findRepositoryList({userId:userId}))}
                    okText='确定'
                    cancelText='取消'
                >
                    <a href="#" style={{color:'red'}}>{t('tcdelete')}</a>
                </Popconfirm>
            </Space>
            ),
        },
    ]

    const [tableLoading,setTableLoading] = useState(true)
    const userId = getUser().userId;

    useEffect(()=> {
        findRepositoryList({userId:userId}).then(res=>{
            setTableLoading(false)
        });
    },[userId])


    // 保存id到缓存,跳往详情页
    const toRepositoryDetail = (id) => {
        sessionStorage.setItem("repositoryId",id);

        //给左侧导航设置一个选择项
        localStorage.setItem("leftRouter","/repository/detail")

        //最近空间
        let params = {
            repository: {id:id},
            userId:userId
        }
        repositoryRecent(params)


        props.history.push('/repository');
    }


    return(
        <Table
            className="tablelist"
            columns={columns}
            dataSource={repositoryList}
            rowKey={record => record.id}
            pagination={false}
            loading={tableLoading}
        />
    )
}

export default inject('repositoryStore',"repositoryRecentStore")(observer(RepositoryCreate));
