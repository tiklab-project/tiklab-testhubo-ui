import React, {useEffect, useState} from "react";
import {Dropdown, Space, Tooltip} from "antd";
import {inject, observer} from "mobx-react";
import {getUser} from "thoughtware-core-ui";
import IconCommon from "../../common/IconCommon";
import {useHistory} from "react-router";
import "./repositoryDetailStyle.scss"
import LeftNavCommon from "../../common/leftMenu/LeftNavCommon";
import RepositoryIcon from "../../common/RepositoryIcon";
import {LeftCircleOutlined} from "@ant-design/icons";

/**
 * 左侧导航展示
 */
const LeftNav = (props) =>{
    const {repositoryStore,systemRoleStore,testcaseStore} = props;
    const {findRepository,repositoryRecent,findRepositoryRecentList,findRepositoryJoinList} = repositoryStore;

    const {setTestType} = testcaseStore;

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
            "icon":"tongji9",
            "name":"缺陷",
            "key":"defect",
            "router":"/repository/defect"
        },
        {
            "icon":"tongji9",
            "name":"统计",
            "key":"homestatistics",
            "router":"/repository/statistics/new-create"
        }
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


    /**
     * 点击左侧导航事件
     */
    const clickAddRouter = (item) =>{
        //设置用例列表筛选项
        setTestType(null)

        //点击左侧导航，设置选择项,用于刷新后还能选择。
        localStorage.setItem("leftRouter",item.router);

        if(item.key==="overview"){
            history.push(`${item.router}/${repositoryId}`)
        }else if(item.key==="testcase"){
            let caseView = localStorage.getItem("CASE_VIEW")
            if(caseView==="list"){
                history.push(`${item.router}-list/${repositoryId}`)
            }else {
                history.push(`${item.router}/${repositoryId}`)
            }
        }else {
            history.push(item.router)
        }
    }


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
    const toggleRepositorys = (
        <div className={"ws-hover-box"}>
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

    /**
     * 点击设置
     */
    const clickSetting = ()=>{
        //点击左侧导航，设置选择项,用于刷新后还能选择。
        localStorage.setItem("leftRouter","setting");

        props.history.push("/repository/setting/detail");
    }



    const showToggleRepository = ()=> (
        <>
            <li className={`ws-detail-left-nav-item-repository `} >
                <Tooltip placement="right" title={repositoryInfo?.name}>
                    <Dropdown
                        overlay={toggleRepositorys}
                        trigger={['click']}
                        visible={visible}
                        onOpenChange={openToggleWorkspace}
                    >
                        <div className={"ws-icon-box"}>
                        <span style={{"cursor":"pointer",margin:" 0 0 0 16px"}}>
                             <RepositoryIcon iconUrl={repositoryInfo?.iconUrl} className={"repository-icon"}/>
                        </span>
                            <IconCommon
                                style={{"cursor":"pointer"}}
                                className={"icon-s"}
                                icon={"xiala"}
                            />
                        </div>
                    </Dropdown>
                </Tooltip>
            </li>
            <li
                className={`ws-detail-left-nav-item `}
                style={{
                    borderBottom: "1px solid #e4e4e4",
                    margin: "0 0 10px 0"
                }}
                onClick={()=> {
                    history.push("/home")
                    localStorage.setItem("leftRouter","/home");
                }}
            >
                <div className={`ws-detail-left-nav-item-box`}>
                    <div className={"ws-detail-left-nav-item-detail"}>
                        <LeftCircleOutlined style={{fontSize:"16px"}}/>
                    </div>
                    <div  className={"ws-detail-left-nav-item-detail"}>
                        返回主页
                    </div>
                </div>
            </li>
        </>
    )

    return(
        <LeftNavCommon
            menuData={menuData}
            clickAddRouter={clickAddRouter}
            clickSetting={clickSetting}
            diffHeader={showToggleRepository}
        />
    )
}

export default inject("repositoryStore","systemRoleStore","testcaseStore")(observer(LeftNav));