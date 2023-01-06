/*
 * @Description: 空间列表页
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:20:46
 */

import React from 'react';
import { observer, inject } from "mobx-react";
import {Empty, Space, Table, Tooltip} from 'antd';
import  { useTranslation } from 'react-i18next'
import {getUser} from "tiklab-core-ui";
import emptyImg  from "../../../assets/img/empty.png"
import {Profile} from "tiklab-eam-ui";


const RepositoryList = (props) => {
    const { repositoryStore ,repositoryRecentStore,repositoryFollowStore,findList,selectItem } = props;
    const { repositoryList,deleteRepository } = repositoryStore;
    
    const {repositoryRecent} = repositoryRecentStore;
    const {createRepositoryFollow,deleteRepositoryFollow} = repositoryFollowStore;
    const { t } = useTranslation();
    let userId=getUser().userId

    const columns = [
        {
            title:`名称`,
            dataIndex: "name",
            key: "name",
            width:"50%",
            // align:"center",
            render: (text,record) =>(
                <Space>
                    <img src={record.iconUrl} alt={"icon"} className={"repository-icon"}/>
                    <a onClick = {()=>toRepositoryDetail(record.id)}>{text}</a>
                </Space>
            )
        },
        {
            title: `负责人`,
            dataIndex: ["user","name"],
            key: "user",
            width:"20%",
            render: (text, record) => (
                <div className={"ws-user-item"}>
                    <Space>
                        <Profile userInfo={record.user}/>
                        <span>{record.user.nickname} </span>
                    </Space>
                </div>

            )
        },{
            title: `可见范围`,
            dataIndex: "visibility",
            key: "visibility",
            width:"20%",
            render: (text, record) => (
                <>
                    {
                        text===0
                            ? showVisibility("公共","suoding")
                            :showVisibility("私密","jiesuo")
                    }
                </>

            )
        },
        {
            title: ` 操作`,
            key: "action",
            width:"10%",
            // align:"center",
            render: (text, record) => (
                <div style={{display:"flex","justifyContent":"space-between",width:60}}>
                    {/*<Tooltip title="成员">*/}
                        {/*<svg style={{width:16,height:16,"cursor":"pointer"}} aria-hidden="true" onClick={()=>toRepositoryUser(record.id)}>*/}
                        {/*    <use xlinkHref= {`#icon-chengyuan`} />*/}
                        {/*</svg>*/}

                    {/*</Tooltip>*/}
                    <svg style={{width:16,height:16,"cursor":"pointer"}} aria-hidden="true" onClick={()=>follow(record)}>
                        <use xlinkHref= {`#icon-${  record.isFollow===0 ? "shoucang":"shoucang1" }`}  />
                    </svg>
                    <svg style={{width:16,height:16,"cursor":"pointer"}} aria-hidden="true" onClick={()=>deleteRepository(record.id)}>
                        <use xlinkHref= {`#icon-shanchu1`}  />
                    </svg>
                </div>
            ),
        },
    ]

    //收藏空间
    const follow = (record)=>{

        if(record.isFollow===1){
            deleteRepositoryFollow(record.id).then(()=>{
                findList({},selectItem)
            })
        }else {
            let param = { repositoryId: record.id }
            createRepositoryFollow(param).then(()=>{
                findList({},selectItem)
            })
        }

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

    //可见范围的展示
    const showVisibility = (name,icon) =>{
        return <div style={{"display":"flex","alignItems":"center","gap":"6px"}}>
            <svg style={{width:16,height:16}} aria-hidden="true">
                <use xlinkHref= {`#icon-${icon}`} />
            </svg>
            <span>{name}</span>
        </div>
    }


    return(
        <div className={"pi-list-box"}>
            <Table
                className="tablelist"
                columns={columns}
                dataSource={repositoryList}
                rowKey={record => record.id}
                pagination={false}
                locale={{
                    emptyText: <Empty
                        imageStyle={{
                            height: 120,
                        }}
                        description={<span>暂无空间</span>}
                        image={emptyImg}
                    />,
                }}
            />
        </div>

    )
}

export default inject('repositoryStore',"repositoryFollowStore","repositoryRecentStore")(observer(RepositoryList));
