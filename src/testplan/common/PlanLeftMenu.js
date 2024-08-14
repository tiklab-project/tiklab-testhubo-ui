import React, {useEffect, useState} from "react";
import {useHistory} from "react-router";
import { LeftCircleOutlined} from "@ant-design/icons";
import {Dropdown} from "antd";
import IconCommon from "../../common/IconCommon";
import planImg from "../../assets/img/plan.png"
import testPlanStore from "../plan/store/testPlanStore";
import "../plan/components/testPlanStyle.scss"
import LeftMenuCommon from "../../common/LeftMenuCommon/LeftMenuCommon";
import {observer} from "mobx-react";
import ListIcon from "../../common/ListIcon/ListIcon";

const PlanLeftMenu = (props) =>{
    const {findTestPlanPage,testPlanList,findTestPlan,testPlanInfo} = testPlanStore;

    const autoLeftMenu = [
        {
            "icon":"test-case-group",
            "name":"测试用例",
            "key":"plan",
            "router":"/plan/case"
        },{
            "icon":"baogao",
            "name":"测试历史",
            "key":"instance",
            "router":"/plan/instance"
        },{
            "icon":"dingshi",
            "name":"定时任务",
            "key":"quartz",
            "router":"/plan/quartz"
        }
    ]

    const functionLeftMenu=[
        {
            "icon":"test-case-group",
            "name":"测试用例",
            "key":"plan",
            "router":"/plan/case"
        }
    ]

    const history = useHistory()
    const repositoryId = sessionStorage.getItem('repositoryId')
    const testPlanId = sessionStorage.getItem('testPlanId')
    const testPlanType = localStorage.getItem('testPlanType')
    const [visible, setVisible] = useState(false);

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
                            isExpanded&& <div>{testPlanInfo?.name}</div>
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
                <div className={`menu-box-nav-item-${themeColor}
                 ${isExpanded?"menu-box-nav-item-isExpanded":"menu-box-nav-item-not-isExpanded"}
                `}>
                    <div className={"menu-box-nav-item-detail"}>
                        <LeftCircleOutlined style={{fontSize:"18px",margin:"0 5px 0 8px"}}/>
                    </div>
                    <div  className={"menu-box-nav-item-detail"}>
                        返回项目
                    </div>
                </div>
            </li>
        </>
    )


    return(
        <LeftMenuCommon
            menuData={testPlanType==="auto"?autoLeftMenu:functionLeftMenu}
            diffHeader={showTogglePlan}
            settingRouter={"/plan/setting"}
        />
    )
}

export default observer(PlanLeftMenu);