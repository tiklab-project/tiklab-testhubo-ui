/*
 * @Description: 空间列表页
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:20:46
 */

import React, { Fragment, useEffect, useState } from 'react';
import { observer, inject } from "mobx-react";
import { Table } from 'antd';
import  { useTranslation } from 'react-i18next'
import {getUser} from "tiklab-core-ui";

const RepositoryList = (props) => {
    const { repositoryStore ,repositoryRecentStore} = props;
    const {
        findRepositoryList,
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
            width:"30%"
        },
    ]

    const [tableLoading,setTableLoading] = useState(true)
    const userId = getUser().userId;

    useEffect(()=> {
        findRepositoryList().then(()=>{
            setTableLoading(false)
        });
    },[userId])


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

export default inject('repositoryStore',"repositoryRecentStore")(observer(RepositoryList));
