import React, {useEffect, useState} from 'react';
import './repository.scss';
import {Input} from "antd";
import {inject, observer} from "mobx-react";
import {getUser} from "thoughtware-core-ui";
import RepositoryRecentHome from "../../../home/RepositoryRecentHome";
import {SearchOutlined} from "@ant-design/icons";
import RepositoryList from "./RepositoryList";
import IconBtn from "../../../common/iconBtn/IconBtn";

/**
 * 仓库页
 */
const Repository = (props)=> {
    const {repositoryStore} = props;
    const {findRepositoryList,findRepositoryJoinList,findRepositoryFollowList} = repositoryStore;

    const userId = getUser().userId;
    const [selectItem, setSelectItem] = useState("all");
    
    //项目筛选列表
    const items = [
        {
            title: '所有仓库',
            key: `all`,
        },
        {
            title: '我创建的',
            key: `create`,
        },
        {
            title: '我收藏的',
            key: `follow`,
        }
    ];

    /**
     *  渲染筛选项
     */
    const showMenu = (data) =>{
        return data&&data.map(item=>{
            return(
                <div
                    key={item.key}
                    className={`ws-header-menu-item  ${item.key === selectItem ? "ws-header-menu-item-selected" : ""}`}
                    onClick={()=>selectKeyFun(item)}
                >
                    <span> {item.title} </span>

                </div>
            )
        })
    }

    useEffect(()=>{
        findList()
    },[])

    /**
     * 点击筛选项查找
     */
    const selectKeyFun = (item)=>{
        setSelectItem(item.key)

        findList({},item.key)
    }

    /**
     * 搜索
     */
    const onSearch = (e) =>{
        let name = {name:e.target.value}

        setSelectItem("all")
        findList(name,"all")
    }

    /**
     * 根据不同的筛选项查找
     */
    const findList = (name,selectIndex)=>{
        let uId = {userId:userId}

        switch (selectIndex?selectIndex:selectItem) {
            case "all":
                let params= {
                    ...uId,
                    ...name
                }
                findRepositoryJoinList(params)
                break;
            case "create":
                let param = {
                    ...uId,
                    ...name
                }
                findRepositoryList(param)
                break;
            case "follow":
                findRepositoryFollowList(uId)
                break;
        }
    }

    const toRepositoryPage = () =>{
        props.history.push("/repository-edit")
    }


    return(
        <div style={{"height":"var(--pi-calc-content)",overflow:"auto"}}>
            <div className='ws-layout'>
                <div className={"display-flex-between"}>
                    <div>
                        <span className={"ws-detail-title"}>
                           <div
                               style={{
                                   display:"flex",
                                   alignItems:"center",
                                   justifyContent:"space-between",
                                   width: 55
                               }}
                           >
                                <svg className={"icon-m"} aria-hidden="true" >
                                    <use xlinkHref= {`#icon-home`} />
                                </svg>
                                <span>仓库</span>
                           </div>
                        </span>
                    </div>
                    <div>
                        <IconBtn
                            className="important-btn"
                            onClick={toRepositoryPage}
                            name={"添加仓库"}
                        />
                    </div>
                </div>

                <div className={"home-box-item-detail"}>
                    <div style={{margin:"10px 0 "}}>最近访问</div>
                    <RepositoryRecentHome {...props}/>
                </div>

                <div className={"ws-header-menu"}>
                    <div className={"ws-header-menu-left"}>
                        {showMenu(items)}
                    </div>
                    <Input
                        prefix={<SearchOutlined />}
                        placeholder={`搜索仓库名`}
                        onPressEnter={onSearch}
                        className={"search-input-common"}
                    />
                </div>

                <div className='contant-box'>
                    <RepositoryList
                        {...props}
                        findList={findList}
                        selectItem={selectItem}
                    />
                </div>
            </div>
        </div>
    )

}


export default inject('repositoryStore')(observer(Repository));
