import React, {useState} from 'react';
import { renderRoutes } from "react-router-config";
import './repository.scss';
import BreadcrumbEx from "../../common/breadcrumbEx";
import RepositoryEdit from "./repositoryEdit";
import {Input, Space} from "antd";
import {inject, observer} from "mobx-react";
import {getUser} from "tiklab-core-ui";

const Repository = (props)=> {
    const {repositoryStore} = props;
    const {menuSelected,selectedItem,findRepositoryList} =repositoryStore;

    const userId = getUser().userId;
    const router = props.route.routes;

    //项目列表左侧导航列表
    const items = [
        {
            title: '所有用例库',
            key: 'all',
            router: `/repository/all`
        },{
            title: `最近浏览`,
            key: 'recent',
            router: `/repository/recent`
        },
        {
            title: '创建的用例库',
            key: 'create',
            router: `/repository/create`
        },
        {
            title: '参与的用例库',
            key: 'join',
            router: `/repository/join`
        },
        // {
        //     title: '关注的用例库',
        //     key: 'follow',
        //     router: `/repository/follow`
        // }
    ];

    const showMenu = (data) =>{
        return data&&data.map(item=>{
            return(
                <div
                    key={item.key}
                    className={`repository-header-menu-item  ${item.key === selectedItem ? "repository-header-menu-item-selected" : null}`}
                    onClick={()=>selectKeyFun(item)}
                >
                    <span> {item.title} </span>

                </div>
            )
        })
    }

    const selectKeyFun = (item)=>{
        menuSelected(item.key)
        props.history.push(item.router);
    }

    const onSearch = (e) =>{
        switch (selectedItem) {
            case "all":
                findRepositoryList({name:e.target.value})
                break;
            case "create":
                let param = {
                    userId:userId,
                    name:e.target.value
                }
                findRepositoryList(param)
                break;
        }

    }

    const rightContent = () =>{
        return(
            <Space>
                <Input
                    placeholder={`搜索项目`}
                    onPressEnter={onSearch}
                />
                <RepositoryEdit name={"添加项目"} btn={"btn"} {...props}/>
            </Space>
        )
    }

    return(
        <div className='tccontant-contant'>
            <BreadcrumbEx list={["仓库","仓库列表"]} />
            <div className={"repository-header-menu"}>
                <div className={"repository-header-menu-left"}>{showMenu(items)}</div>
                <>{rightContent()}</>
            </div>

            <div className='contant-box'>
                {renderRoutes(router)}
            </div>
        </div>
    )


}


export default inject("repositoryStore")(observer(Repository));
