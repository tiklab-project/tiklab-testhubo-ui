import React, {useEffect, useState} from "react";
import {Dropdown, Space, Tooltip} from "antd";
import {inject, observer} from "mobx-react";
import {getUser} from "tiklab-core-ui";
import IconCommon from "../../common/IconCommon";
import {useHistory} from "react-router";
import "./repositoryDetailStyle.scss"
import "../../test/common/styles/testcaseStyle.scss"
import RepositoryIcon from "../../common/RepositoryIcon";
import {HomeOutlined} from "@ant-design/icons";
import LeftMenuCommon from "../../common/LeftMenuCommon/LeftMenuCommon";

/**
 * 左侧导航展示
 */
const LeftNav = (props) =>{
    const {repositoryStore,systemRoleStore} = props;
    const {findRepository,repositoryRecent,findRepositoryRecentList,findRepositoryJoinList} = repositoryStore;
    let userId = getUser().userId
    const repositoryId = sessionStorage.getItem("repositoryId")

    const menuData = [
        {
            "icon":"layers",
            "name":"概况",
            "key":"overview",
            "router":`/project/${repositoryId}/overview`
        }, {
            "icon":"test-case-group",
            "name":"测试用例",
            "key":"testcase",
            "router":`/project/${repositoryId}/testcase`
        },
        {
            "icon":"jihua",
            "name":"测试计划",
            "key":"testplan",
            "router":`/project/${repositoryId}/plan`
        },{
            "icon":"baogao",
            "name":"测试报告",
            "key":"report",
            "router":`/project/${repositoryId}/report`
        },
        {
            "icon":"quexian",
            "name":"缺陷",
            "key":"defect",
            "router":`/project/${repositoryId}/issue`
        },
        {
            "icon":"tongji9",
            "name":"统计",
            "key":"homestatistics",
            "router":`/project/${repositoryId}/statistics/newAdd`
        },
    ]

    const [visible, setVisible] = useState(false);
    const [repositoryInfo, setRepositoryInfo] = useState();
    const [recentList, setRecentList] = useState([]);

    const history = useHistory()


    useEffect(()=>{
        findRepository(repositoryId).then(res=>{
            setRepositoryInfo(res)
        })

        systemRoleStore.getInitProjectPermissions(userId, repositoryId)
    },[repositoryId])


    const openToggleWorkspace = async () =>{
        setVisible(!visible)

        let userId = getUser().userId
        let recentList = await findRepositoryRecentList(userId)

        // 如果不足 5 个，从 repositoryList 补充，并去重
        if (recentList.length < 5) {
            let additionalList = await findRepositoryJoinList({ userId: userId });

            // 去重
            additionalList = additionalList.filter(item => !recentList.some(existingItem => existingItem.id === item.id));

            // 将不足的项目添加到最近项目列表
            recentList = recentList.concat(additionalList.slice(0, 5 - recentList.length));
        }

        // 如果超过 5 个，保留最新的 5 个项目
        recentList = recentList.slice(-5);

        setRecentList(recentList)
    }

    /**
     * 展示切换的项目
     */
    const toggleRepositorys =(isExpanded)=> (
        <div className={"ws-hover-box"} style={{left:`${isExpanded?"200px":"75px"}`}}>
            <div style={{ padding: "10px"}}>
                <div className={"ws-hover-box-title"}>切换项目</div>
                <div style={{height:"210px"}}>
                    {
                        recentList&&recentList.map((item,index)=> {
                            if(index>4) return
                                return(
                                    <div
                                        className={`ws-hover-item ${item.id===repositoryId?"ws-toggle-ws-select":""}`}
                                        key={item.id}
                                        onClick={() => toggleRepository(item.id)}
                                    >
                                        <Space>
                                            <RepositoryIcon iconUrl={item.iconUrl} className={"ws-img-icon"}/>
                                            {item.name}
                                        </Space>
                                    </div>
                                )
                            }
                        )
                    }
                </div>
            </div>

            <a className={"ws-toggle-repository_more"} onClick={()=> {
                history.push("/project")
                localStorage.setItem("leftRouter",`/project`)
            }}>查看更多</a>
        </div>
    )

    /**
     * 切换项目
     */
    const toggleRepository = (repositoryId)=>{

        sessionStorage.setItem("repositoryId",repositoryId);

        //给左侧导航设置一个选择项
        localStorage.setItem("leftRouter",`/project/${repositoryId}/testcase`)

        //最近项目
        let params = {
            repository: {id:repositoryId},
            userId:userId
        }
        repositoryRecent(params)

        props.history.push(`/project/${repositoryId}/testcase`);

        setVisible(false)
    }


    const showToggleRepository = (isExpanded,themeColor)=> (
        <>
            {
                isExpanded
                    ?  <li className={`menu-box-nav-item-repository `} >
                        <Dropdown
                            overlay={()=>toggleRepositorys(isExpanded)}
                            trigger={['click']}
                            visible={visible}
                            onOpenChange={openToggleWorkspace}
                        >
                            <div style={{padding:`15px  0 15px 24px`}} className={`ws-icon-box menu-box-nav-item-isExpanded`}>
                                <div style={{"cursor":"pointer"}}>
                                    <RepositoryIcon iconUrl={repositoryInfo?.iconUrl} className={`icon-l`}/>
                                </div>
                                <div className={"text-ellipsis"} style={{maxWidth:"100px"}}>{repositoryInfo?.name}</div>
                                <IconCommon
                                    style={{
                                        "cursor":"pointer",
                                        width:"10px",
                                        height:"10px",
                                        marginLeft:"3px"
                                    }}
                                    icon={"xiala"}
                                />
                            </div>
                        </Dropdown>
                    </li>

                    : <Dropdown
                        overlay={()=>toggleRepositorys(isExpanded)}
                        trigger={['click']}
                        visible={visible}
                        onOpenChange={openToggleWorkspace}
                    >
                        <Tooltip
                            placement="right"
                            title={repositoryInfo?.name}
                        >
                            <li className={`menu-box-nav-item-repository `} >
                                <div style={{padding:`15px  0 15px 24px`}} className={`ws-icon-box menu-box-nav-item-not-isExpanded`}>
                                    <div style={{"cursor":"pointer"}}>
                                        <RepositoryIcon iconUrl={repositoryInfo?.iconUrl} className={`icon-x`}/>
                                    </div>
                                </div>
                            </li>
                        </Tooltip>
                    </Dropdown>

            }
            <li
                className={`menu-box-nav-item`}
                style={{
                    borderBottom:themeColor==="theme-default"?"1px solid #e3e3e3":"1px solid #f6f7f81a",
                    margin: "0 0 10px 0"
                }}
                onClick={()=> {
                    history.push("/index")
                    localStorage.setItem("leftRouter","/index");
                }}
            >
                {
                    isExpanded
                        ?<div className={`menu-box-nav-item-${themeColor}  menu-box-nav-item-isExpanded`}>
                            <div className={"menu-box-nav-item-detail"}>
                                <HomeOutlined
                                    style={{
                                        fontSize:`18px`,
                                        margin:"0 5px 0 6px",
                                        color:"#777"
                                    }}
                                />
                            </div>
                            <div  className={"menu-box-nav-item-detail"}>
                                返回主页
                            </div>
                        </div>
                        : <Tooltip placement="right" title={"返回主页"}>
                            <div className={`menu-box-nav-item-${themeColor} menu-box-nav-item-not-isExpanded`}>
                                <div className={"menu-box-nav-item-detail"}>
                                    <HomeOutlined
                                        style={{
                                            fontSize:`24px`,
                                            margin:"0 5px 0 6px",
                                            color:"#777"
                                        }}
                                    />
                                </div>
                            </div>
                        </Tooltip>
                }
            </li>
        </>
    )

    return(
        <LeftMenuCommon
            menuData={menuData}
            diffHeader={showToggleRepository}
            repositoryId={repositoryId}
            settingRouter={`/project/${repositoryId}/setting`}
        />
    )
}

export default inject("repositoryStore","systemRoleStore","testcaseStore")(observer(LeftNav));