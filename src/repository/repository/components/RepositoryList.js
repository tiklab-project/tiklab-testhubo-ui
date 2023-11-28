
import React from 'react';
import { observer, inject } from "mobx-react";
import {Empty, Space, Table, Tooltip,Avatar} from 'antd';
import {getUser} from "tiklab-core-ui";
import emptyImg  from "../../../assets/img/empty.png"
import repositoryFollowStore from "../store/RepositoryFollowStore";
import {UserOutlined} from "@ant-design/icons";
import RepositoryIcon from "../../../common/RepositoryIcon";


/**
 * 仓库列表
 */
const RepositoryList = (props) => {
    const { repositoryStore ,findList,selectItem } = props;
    const { repositoryList,repositoryRecent } = repositoryStore;

    const {createRepositoryFollow,deleteRepositoryFollow} = repositoryFollowStore;

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
                    <RepositoryIcon iconUrl={record.iconUrl} className={"ws-img-icon"}/>
                    <span className={"link-text"}  onClick = {()=>toRepositoryDetail(record.id)}>{text}</span>
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
                        <Avatar size={"small"}>{record.user.nickname[0]}</Avatar>
                        <span style={{fontSize:"13px"}}>{record.user.nickname} </span>
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
                <div style={{display:"flex","justifyContent":"space-between",width:50}}>
                    <Tooltip title="成员">
                        <svg style={{width:16,height:16,"cursor":"pointer"}} aria-hidden="true" onClick={()=>toRepositoryRole(record.id)}>
                            <use xlinkHref= {`#icon-chengyuan`} />
                        </svg>
                    </Tooltip>
                    <svg style={{width:16,height:16,"cursor":"pointer"}} aria-hidden="true" onClick={()=>follow(record)}>
                        <use xlinkHref= {`#icon-${  record.isFollow===0 ? "shoucang":"shoucang1" }`}  />
                    </svg>
               </div>
            ),
        },
    ]

    /**
     * 收藏仓库
     */
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

    /**
     * 跳往成员页面
     */
    const toRepositoryRole = (id) => {

        toRepositoryConfig(id);

        //给左侧导航设置一个选择项
        localStorage.setItem("leftRouter","/repository/setting");


        props.history.push('/repository/setting/role');
    }


    /**
     * 保存id到缓存,跳往详情页
     */

    const toRepositoryDetail = (id) => {

        toRepositoryConfig(id);

        //给左侧导航设置一个选择项
        localStorage.setItem("leftRouter","/repository/detail")

        props.history.push(`/repository/detail/${id}`);
    }

    /**
     * 去往仓库公共配置
     */
    const toRepositoryConfig= (id) =>{
        sessionStorage.setItem("repositoryId",id);

        //最近仓库
        let params = {
            repository: {id:id},
            userId:userId
        }
        repositoryRecent(params)
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
                        description={<span>暂无仓库</span>}
                        image={emptyImg}
                    />,
                }}
            />
        </div>

    )
}

export default inject('repositoryStore')(observer(RepositoryList));
