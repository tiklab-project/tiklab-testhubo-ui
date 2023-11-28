import React, {useEffect, useState} from "react";
import {useHistory} from "react-router";
import LeftNavCommon from "../../common/leftMenu/LeftNavCommon";
import {ArrowLeftOutlined, LeftCircleOutlined} from "@ant-design/icons";
import {Dropdown, Space} from "antd";
import IconCommon from "../../common/IconCommon";
import planImg from "../../assets/img/plan.png"
import testPlanStore from "../store/testPlanStore";

const PlanLeftMenu = (props) =>{
    const {findTestPlanPage,testPlanList} = testPlanStore;

    const menuData = [
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
        }
    ]

    const history = useHistory()
    const repositoryId = sessionStorage.getItem('repositoryId')
    const [visible, setVisible] = useState(false);

    useEffect(()=>{
        let param={
            repositoryId:repositoryId,
            pageParam: {
                pageSize: 5,
                currentPage: 1
            },
        }
        findTestPlanPage(param)
    },[])

    /**
     * 点击左侧导航事件
     */
    const clickAddRouter = (item) =>{
        //点击左侧导航，设置选择项,用于刷新后还能选择。
        localStorage.setItem("leftRouter",item.router);

        history.push(item.router)
    }


    /**
     * 点击设置
     */
    const clickSetting = ()=>{
        //点击左侧导航，设置选择项,用于刷新后还能选择。
        localStorage.setItem("leftRouter","setting");

        history.push("/plan/setting");
    }

    /**
     * 展示切换的计划
     */
    const togglePlan = (
        <div className={"ws-hover-box"}>
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


    const showTogglePlan = ()=> (
        <>
            <li className={`ws-detail-left-nav-item-repository `} >
                <Dropdown
                    overlay={togglePlan}
                    trigger={['click']}
                    visible={visible}
                    onOpenChange={()=>setVisible(!visible)}
                >
                    <div className={"ws-icon-box"}>
                    <span style={{"cursor":"pointer",margin:" 0 0 0 16px"}}>
                         <img src={planImg} alt={"icon"} className={"repository-icon"}/>
                    </span>
                        <IconCommon
                            style={{"cursor":"pointer"}}
                            className={"icon-s"}
                            icon={"xiala"}
                        />
                    </div>
                </Dropdown>
            </li>
            <li
                className={`ws-detail-left-nav-item `}
                style={{ borderBottom: "1px solid #e4e4e4"}}
                onClick={()=> {
                    history.push("/repository/plan")
                    localStorage.setItem("leftRouter","/repository/plan");
                }}
            >
                <div className={`ws-detail-left-nav-item-box`}>
                    <div className={"ws-detail-left-nav-item-detail"}>
                        <LeftCircleOutlined />
                    </div>
                    <div  className={"ws-detail-left-nav-item-detail"}>
                        返回项目
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
            diffHeader={showTogglePlan}
        />
    )
}

export default PlanLeftMenu;