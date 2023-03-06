import React, {useEffect, useState} from 'react';
import './repository.scss';
import RepositoryEdit from "./RepositoryEdit";
import {Input, Space} from "antd";
import {inject, observer} from "mobx-react";
import {getUser} from "tiklab-core-ui";
import RepositoryRecentHome from "./RepositoryRecentHome";
import {SearchOutlined} from "@ant-design/icons";
import RepositoryList from "./RepositoryList";

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
            title: '我收藏的',
            key: `follow`,
        },
        {
            title: '我创建的',
            key: `create`,
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

        findList(name)
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


    return(
        <div style={{"height":"100%",overflow:"auto"}}>
            <div className='ws-layout'>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "10px 0 10px 10px"
                    }}
                >
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
                        <RepositoryEdit
                            name={"添加空间"}
                            btn={"btn"}
                            userId={userId}
                            findList={findList}
                            selectItem={selectItem}
                            {...props}
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
                        placeholder={`搜索空间`}
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


export default inject('repositoryStore',"repositoryFollowStore","repositoryRecentStore")(observer(Repository));
