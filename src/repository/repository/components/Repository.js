import React, {useEffect, useState} from 'react';
import './repository.scss';
import {Row,Col, Input} from "antd";
import {inject, observer} from "mobx-react";
import {getUser} from "thoughtware-core-ui";
import RepositoryRecentHome from "../../../home/RepositoryRecentHome";
import {SearchOutlined} from "@ant-design/icons";
import RepositoryList from "./RepositoryList";
import IconBtn from "../../../common/iconBtn/IconBtn";

/**
 * 项目页
 */
const Repository = (props)=> {
    const {repositoryStore} = props;
    const {findRepositoryList,findRepositoryJoinList,findRepositoryFollowList} = repositoryStore;

    const userId = getUser().userId;
    const [selectItem, setSelectItem] = useState("all");
    
    //项目筛选列表
    const items = [
        {
            title: '所有项目',
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
        props.history.push("/project-edit")
    }


    return(
        <div style={{"height":"100%",overflow:"auto"}}>
            <Row style={{height:"100%"}}>
                <Col
                    md={{ span: 24, offset: 0 }}
                    lg={{ span: 20, offset: 2 }}
                    xl={{ span: 18, offset: 3 }}
                    xll={{ span: 16, offset: 4 }}
                >
                <div className='ws-layout'>
                    <div className={"display-flex-between"}>
                    <span style={{
                        fontSize:"16px",
                        fontWeight:"bold",
                    }}>项目</span>
                        <div>
                            <IconBtn
                                className="important-btn"
                                onClick={toRepositoryPage}
                                name={"添加项目"}
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
                            placeholder={`搜索项目名`}
                            onPressEnter={onSearch}
                            className={"search-input-common"}
                        />
                    </div>

                    <div className='contant-box' style={{margin:"10px 0 0 0"}}>
                        <RepositoryList
                            {...props}
                            findList={findList}
                            selectItem={selectItem}
                        />
                    </div>
                </div>
                </Col>
            </Row>
        </div>
    )

}


export default inject('repositoryStore')(observer(Repository));
