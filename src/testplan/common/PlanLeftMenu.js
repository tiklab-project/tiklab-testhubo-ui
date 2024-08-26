import React, {useEffect, useState} from "react";
import {useHistory} from "react-router";
import {AppstoreOutlined} from "@ant-design/icons";
import {Dropdown, Tooltip} from "antd";
import IconCommon from "../../common/IconCommon";
import testPlanStore from "../plan/store/testPlanStore";
import "../plan/components/testPlanStyle.scss"
import LeftMenuCommon from "../../common/LeftMenuCommon/LeftMenuCommon";
import {observer} from "mobx-react";
import ListIcon from "../../common/ListIcon/ListIcon";

const PlanLeftMenu = (props) =>{
    const {findTestPlanPage,testPlanList,findTestPlan,testPlanInfo} = testPlanStore;
    const history = useHistory()
    const repositoryId = sessionStorage.getItem('repositoryId')
    const testPlanId = sessionStorage.getItem('testPlanId')
    const testPlanType = localStorage.getItem('testPlanType')
    const [visible, setVisible] = useState(false);

    const autoLeftMenu = [
        {
            "icon":"test-case-group",
            "name":"测试用例",
            "key":"plan",
            "router":`/plan/${testPlanId}/case`
        },{
            "icon":"baogao",
            "name":"测试历史",
            "key":"instance",
            "router":`/plan/${testPlanId}/instance`
        },{
            "icon":"dingshi",
            "name":"定时任务",
            "key":"quartz",
            "router":`/plan/${testPlanId}/quartz`
        }
    ]

    const functionLeftMenu=[
        {
            "icon":"test-case-group",
            "name":"测试用例",
            "key":"plan",
            "router":`/plan/${testPlanId}/case`
        }
    ]


    useEffect(()=>{
        findTestPlan(testPlanId)
    },[])

    useEffect(async ()=>{
        let param={
            repositoryId:repositoryId,
            pageParam: {
                pageSize: 5,
                currentPage: 1
            },
        }
        await findTestPlanPage(param)
    },[])

    /**
     * 展示切换的计划
     */
    const togglePlan =(isExpanded)=>  (
        <div className={"ws-hover-box"} style={{left:`${isExpanded?"200px":"75px"}`}}>
            <div style={{ padding: "10px"}}>
                <div className={"ws-hover-box-title"}>切换计划</div>
                <div style={{height:"169px"}}>
                    {
                        testPlanList&&testPlanList.map((item,index)=> {
                                if(index>3) return
                                return(
                                    <div
                                        className={"ws-hover-item"}
                                        key={item.id}
                                        onClick={() => {
                                            sessionStorage.setItem('testPlanId',item.id);
                                            localStorage.setItem("leftRouter","/plan/case");
                                            history.push(`/plan/case`);
                                            setVisible(false)
                                        }}
                                    >
                                        {item.name}
                                    </div>
                                )
                            }
                        )
                    }
                </div>
            </div>
        </div>
    )


    const showTogglePlan = (isExpanded,themeColor)=> (
        <>
            <li className={`menu-box-nav-item-repository `} >
                <Dropdown
                    overlay={()=>togglePlan(isExpanded)}
                    trigger={['click']}
                    visible={visible}
                    onOpenChange={()=>setVisible(!visible)}
                >
                    <div style={{padding:`15px 0 15px 24px`}}  className={`ws-icon-box  ${isExpanded?"menu-box-nav-item-isExpanded":"menu-box-nav-item-not-isExpanded"}`}>
                        <div style={{"cursor":"pointer"}}>
                            <ListIcon colors={1} text={testPlanInfo?.name} isMar={false} className={`${isExpanded?"icon-l":"icon-x"}`}/>
                        </div>
                        {
                            isExpanded&& <>
                                <div>{testPlanInfo?.name}</div>
                                <IconCommon
                                    style={{
                                        "cursor":"pointer",
                                        width:"12px",
                                        height:"12px",
                                        marginLeft:"3px"
                                    }}
                                    icon={"xiala"}
                                />
                            </>
                        }
                    </div>
                </Dropdown>
            </li>
            <li
                className={`menu-box-nav-item`}
                style={{
                    borderBottom:themeColor==="theme-default"?"1px solid #e3e3e3":"1px solid #f6f7f81a",
                    margin: "0 0 10px 0"
                }}
                onClick={()=> {
                    history.push(`/project/${repositoryId}/plan`)
                    localStorage.setItem("leftRouter",`/project/${repositoryId}/plan`);
                }}
            >
                {
                    isExpanded
                        ?<div className={`menu-box-nav-item-${themeColor}  menu-box-nav-item-isExpanded`}>
                            <div className={"menu-box-nav-item-detail"}>
                                <AppstoreOutlined
                                    style={{
                                        fontSize:`${isExpanded?"18px":"24px"}`,
                                        margin:"0 5px 0 6px",
                                        color:"#777"
                                    }}
                                />
                            </div>
                            <div  className={"menu-box-nav-item-detail"}>
                                返回项目
                            </div>
                        </div>
                        : <Tooltip placement="right" title={"返回项目"}>
                            <div className={`menu-box-nav-item-${themeColor} menu-box-nav-item-not-isExpanded`}>
                                <div className={"menu-box-nav-item-detail"}>
                                    <AppstoreOutlined
                                        style={{
                                            fontSize:`${isExpanded?"18px":"24px"}`,
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
            menuData={testPlanType==="auto"?autoLeftMenu:functionLeftMenu}
            diffHeader={showTogglePlan}
            settingRouter={`/plan/${testPlanId}/setting`}
        />
    )
}

export default observer(PlanLeftMenu);