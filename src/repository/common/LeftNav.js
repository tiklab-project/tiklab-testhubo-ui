import React, {useEffect, useState} from "react";
import {Dropdown, Space, Tooltip} from "antd";
import {inject, observer} from "mobx-react";
import {getUser} from "thoughtware-core-ui";
import IconCommon from "../../common/IconCommon";
import {useHistory} from "react-router";
import "./repositoryDetailStyle.scss"
import RepositoryIcon from "../../common/RepositoryIcon";
import {LeftCircleOutlined} from "@ant-design/icons";
import LeftMenuCommon from "../../common/LeftMenuCommon/LeftMenuCommon";

/**
 * 左侧导航展示
 */
const LeftNav = (props) =>{
    const {repositoryStore,systemRoleStore} = props;
    const {findRepository,repositoryRecent,findRepositoryRecentList,findRepositoryJoinList} = repositoryStore;

    const menuData = [
        {
            "icon":"layers",
            "name":"概况",
            "key":"overview",
            "router":"/repository/detail"
        }, {
            "icon":"test-case-group",
            "name":"测试用例",
            "key":"testcase",
            "router":"/repository/testcase"
        },
        {
            "icon":"jihua",
            "name":"测试计划",
            "key":"testplan",
            "router":"/repository/plan"
        },{
            "icon":"baogao",
            "name":"测试报告",
            "key":"report",
            "router":"/repository/report"
        },
        {
            "icon":"quexian",
            "name":"缺陷",
            "key":"defect",
            "router":"/repository/defect"
        },
        {
            "icon":"tongji9",
            "name":"统计",
            "key":"homestatistics",
            "router":"/repository/statistics/new-create"
        },
    ]

    const [visible, setVisible] = useState(false);
    const [repositoryInfo, setRepositoryInfo] = useState();
    const [recentList, setRecentList] = useState([]);
    let userId = getUser().userId
    const repositoryId = sessionStorage.getItem("repositoryId")
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


            <a className={"ws-toggle-repository_more"} onClick={()=>history.push("/project")}>查看更多</a>
        </div>
    )

    /**
     * 切换项目
     */
    const toggleRepository = (repositoryId)=>{

        sessionStorage.setItem("repositoryId",repositoryId);

        //给左侧导航设置一个选择项
        localStorage.setItem("leftRouter","/repository/testcase")

        //最近项目
        let params = {
            repository: {id:repositoryId},
            userId:userId
        }
        repositoryRecent(params)

        props.history.push(`/repository/testcase/${repositoryId}`);

        setVisible(false)
    }


    const showToggleRepository = (isExpanded,themeColor)=> (
        <>
            <li className={`menu-box-nav-item-repository `} >
                <Tooltip placement="right" title={repositoryInfo?.name}>
                    <Dropdown
                        overlay={()=>toggleRepositorys(isExpanded)}
                        trigger={['click']}
                        visible={visible}
                        onOpenChange={openToggleWorkspace}
                    >
                        <div style={{padding:`15px  0 15px 21px`}} className={`ws-icon-box ${isExpanded?"menu-box-nav-item-isExpanded":"menu-box-nav-item-not-isExpanded"}`}>
                            <div style={{"cursor":"pointer"}}>
                                 <RepositoryIcon iconUrl={repositoryInfo?.iconUrl} className={"icon-x"}/>
                            </div>
                            {
                                isExpanded&& <div className={"text-ellipsis"} style={{maxWidth:"100px"}}>{repositoryInfo?.name}</div>
                            }

                            <IconCommon
                                style={{
                                    "cursor":"pointer",
                                    width:"12px",
                                    height:"12px",
                                    marginLeft:"3px"
                                }}
                                icon={"xiala"}
                            />
                        </div>
                    </Dropdown>
                </Tooltip>
            </li>
            <li
                className={`menu-box-nav-item`}
                style={{
                    borderBottom:themeColor==="theme-default"?"1px solid #e3e3e3":"1px solid #f6f7f81a",
                    margin: "0 0 10px 0"
                }}
                onClick={()=> {
                    history.push("/home")
                    localStorage.setItem("leftRouter","/home");
                }}
            >
                <div className={`
                    menu-box-nav-item-${themeColor}
                  ${isExpanded?"menu-box-nav-item-isExpanded":"menu-box-nav-item-not-isExpanded"}
                `}>
                    <div className={"menu-box-nav-item-detail"}>
                        <LeftCircleOutlined style={{fontSize:"18px",margin:"0 5px 0 8px"}}/>
                    </div>
                    <div  className={"menu-box-nav-item-detail"}>
                        返回主页
                    </div>
                </div>
            </li>
        </>
    )

    return(
        <LeftMenuCommon
            menuData={menuData}
            diffHeader={showToggleRepository}
            repositoryId={repositoryId}
            settingRouter={"/repository/setting"}
        />
    )
}

export default inject("repositoryStore","systemRoleStore","testcaseStore")(observer(LeftNav));