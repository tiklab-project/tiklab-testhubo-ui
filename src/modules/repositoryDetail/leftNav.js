import React, {useEffect, useState} from "react";
import {Space} from "antd";
import {inject, observer} from "mobx-react";
import {getUser} from "tiklab-core-ui";
import IconCommon from "../common/iconCommon";

const LeftNav = (props) =>{
    const {repositoryStore,systemRoleStore,repositoryRecentStore,testcaseStore} = props;
    const {findRepository,findRepositoryList,repositoryList} = repositoryStore;
    const {repositoryRecent} = repositoryRecentStore;
    const {setTestType} = testcaseStore;

    const menuData = [
        {
            "icon":"layers",
            "name":"概况",
            "key":"detail",
            "router":"/repository/detail"
        }, {
            "icon":"layers",
            "name":"测试用例",
            "key":"detail",
            "router":"/repository/testcase"
        },
        {
            "icon":"jihua",
            "name":"测试计划",
            "key":"testplan",
            "router":"/repository/plan"
        },{
            "icon":"gongdan",
            "name":"测试报告",
            "key":"report",
            "router":"/repository/report"
        }
    ]

    const [repositoryIcon, setRepositoryIcon] = useState();
    let userId = getUser().userId
    const leftRouter = localStorage.getItem("leftRouter")
    const repositoryId = sessionStorage.getItem("repositoryId")

    useEffect(()=>{
        findRepository(repositoryId).then(res=>{
            setRepositoryIcon(res.iconUrl)
        })
        findRepositoryList({userId:userId})

        systemRoleStore.getInitProjectPermissions(userId, repositoryId)
    },[])



    const clickAddRouter = (item) =>{
        //设置用例列表筛选项
        setTestType(null)

        //点击左侧导航，设置选择项,用于刷新后还能选择。
        localStorage.setItem("leftRouter",item.router);

        //点击导航设置设置类型，用于category查找。testType：api,web,app,function;
        localStorage.setItem("testType",item.key );

        //设置tab，初始选择的unitcase， caseType：unit,scene,perform
        localStorage.setItem("caseType","unit")

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
                                <use xlinkHref= {`#icon-${item.icon}`}/>
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



    //展示切换的仓库
    const showRepositoryList = (list) =>{
        return list&&list.map(item=>{
            return (
                <div className={"ws-hover-item"} key={item.id} onClick={()=>toggleRepository(item.id)}>
                    <Space>
                        <img src={item.iconUrl} alt={"icon"} className={"repository-icon"}/>
                        {item.name}
                    </Space>
                </div>
            )
        })
    }

    //切换仓库
    const toggleRepository = (repositoryId)=>{

        sessionStorage.setItem("repositoryId",repositoryId);

        //给左侧导航设置一个选择项
        localStorage.setItem("leftRouter","/repository/detail")

        //最近仓库
        let params = {
            repository: {id:repositoryId},
            userId:userId
        }
        repositoryRecent(params)

        props.history.push('/repository');
    }


    const clickSetting = ()=>{
        //点击左侧导航，设置选择项,用于刷新后还能选择。
        localStorage.setItem("leftRouter","setting");

        props.history.push("/repository/setting/detail");
    }


    return(
        <ul className={"ws-detail-left-nav left-nav-box"}>
            <div>
                <li className={`ws-detail-left-nav-item-repository `} >
                    <div className={"ws-icon-box"}>
                        <span style={{"cursor":"pointer",margin:" 0 0 0 16px"}}>
                             <img src={repositoryIcon} alt={"icon"} className={"repository-icon"}/>
                        </span>
                        <IconCommon
                            style={{"cursor":"pointer"}}
                            className={"icon-s"}
                            icon={"xiala"}
                        />

                        <div className={"ws-hover-box"}>
                            <div className={"ws-hover-box-title"}>切换仓库</div>
                            {
                                showRepositoryList(repositoryList)
                            }
                        </div>
                    </div>

                </li>
                {
                    showMenuItem(menuData)
                }
            </div>

            <div className={"ws-nav-setting"}>
                <div className={`ws-detail-left-nav-item`} onClick={clickSetting}>
                    <div className={`ws-detail-left-nav-item-box  ws-detail-left-nav-item-setting`}>
                        <div className={"ws-detail-left-nav-item-detail"}>
                            <IconCommon
                                className={"icon-s"}
                                icon={"setting"}
                            />
                        </div>
                        <div  className={"ws-detail-left-nav-item-detail"}>设置</div>
                    </div>
                </div>
            </div>
        </ul>

    )
}

export default inject("repositoryStore","systemRoleStore","repositoryRecentStore","testcaseStore")(observer(LeftNav));