import React, {useState} from "react";
import Avatar from "antd/es/avatar/avatar";
import {UserOutlined} from "@ant-design/icons";

const LeftNav = (props) =>{

    const menuData = [
        {
            "icon":"layers",
            "name":"概况",
            "key":"detail",
            "router":"/repositorypage/detail"
        },{
            "icon":"jiekou",
            "name":"API",
            "key":"api",
            "router":"/repositorypage/apitest"
        },{
            "icon":"web",
            "name":"WEB",
            "key":"web",
            "router":"/repositorypage/webtest"
        },{
            "icon":"jiedianapp",
            "name":"APP",
            "key":"app",
            "router":"/repositorypage/apptest"
        },{
            "icon":"kuaijieyingyon",
            "name":"功能测试",
            "key":"function",
            "router":"/repositorypage/functest"
        },{
            "icon":"tianjiadaofenzu",
            "name":"模块管理",
            "key":"category",
            "router":"/repositorypage/category"
        },{
            "icon":"jihua",
            "name":"测试计划",
            "key":"testplan",
            "router":"/repositorypage/testplan"
        },{
            "icon":"dingshi",
            "name":"定时任务",
            "key":"quartzTask",
            "router":"/repositorypage/quartzTask"
        },
    ]

    const leftRouter = localStorage.getItem("leftRouter")

    const clickAddRouter = (item) =>{

        //点击左侧导航，设置选择项,用于刷新后还能选择。
        localStorage.setItem("leftRouter",item.router);

        //点击导航设置设置类型，用于category查找。testType：api,web,app,function;
        localStorage.setItem("testType",item.key );

        //设置tab，初始选择的unitcase， caseType：unitcase,scenecase,performcase
        localStorage.setItem("caseType","unitcase")

        props.history.push(item.router)
    }


    const showMenuItem = (data) =>{
        return data&&data.map(item=>{
            return(
                <li
                    key={item.router}
                    className={`ws-detail-left-nav-item `}
                    onClick={()=>clickAddRouter(item)}
                >
                    <div className={`ws-detail-left-nav-item-box ${leftRouter===item.router?"selectlink":null}`}>
                        <div className={"ws-detail-left-nav-item-detail"}>
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref= {`#icon-${item.icon}`}></use>
                            </svg>
                        </div>
                        <div  className={"ws-detail-left-nav-item-detail"}>
                            {item.name}
                        </div>
                    </div>
                </li>
            )
        })
    }

    return(
        <>
            {/*<div className={"ws-detail-left-nav-ws "}>*/}
            {/*    <Avatar icon={<UserOutlined />} />*/}
            {/*</div>*/}
            <ul className={"ws-detail-left-nav"}>
                {
                    showMenuItem(menuData)
                }
            </ul>
        </>
    )
}

export default LeftNav;