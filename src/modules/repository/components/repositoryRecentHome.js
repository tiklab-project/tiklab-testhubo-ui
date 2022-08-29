import React, {useEffect} from "react";
import {Table} from "antd";
import {getUser} from "tiklab-core-ui";
import {inject, observer} from "mobx-react";

const RepositoryRecentHome = (props) =>{
    const {repositoryRecentStore} = props;

    const {findRepositoryRecentList,recentList,repositoryRecent}=repositoryRecentStore;

    const userId = getUser().userId;

    const columns = [
        {
            title:"仓库名称",
            dataIndex:["repository","name"],
            key: 'name',
            width:"30%",
            render: (text,record) =>(
                <a onClick = {()=>toDetail(record.repository.id)}>{text}</a>
            )
        },
        {
            title: '访问时间',
            dataIndex: 'updateTime',
            key: 'time',
        },
    ]

    useEffect(()=>{
        findRepositoryRecentList(userId)
    },[userId])

    // 去往详情页
    const toDetail = (repositoryId) => {
        //最近空间
        let params = {
            repository: {id:repositoryId},
            userId:userId
        }
        repositoryRecent(params);

        props.history.push('/repositorypage');
    }


    return(
        <>
            <Table
                columns={columns}
                dataSource={recentList}
                pagination={false}
                rowKey={(record => record.id)}
            />

        </>
    )
}

export default inject("repositoryRecentStore")(observer(RepositoryRecentHome));