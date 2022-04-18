import React, {useEffect} from "react";
import {Tabs} from "antd";
import CaseNavCommon from "./caseNavCommon";
const { TabPane } = Tabs;

const CaseLeftCommon = (props) =>{
    const {routerData,tabPaneValue} = props;

    const caseType = localStorage.getItem("caseType")

    const switchRouter = (type)=>{
        let addRouter = props.history.push;

        switch (type){
            case "unitcase":
                addRouter(routerData.unitcase);
                break;
            case "scenecase":
                addRouter(routerData.scenecase);
                break;
            case "performcase":
                addRouter(routerData.performcase);
                break;
        }
    }



    const changeTab = (tabKey) =>{

        switchRouter(tabKey);

        localStorage.setItem("caseType",tabKey)
    }

    const tabPaneView = (data) =>{
        return data&&data.map(item=>{
            return(
                <TabPane tab={item.name} key={item.key}>
                    <CaseNavCommon {...props} tabKey={item.key}/>
                </TabPane>
            )
        })
    }


    return(
        <div className={"case-tab"}>
            <Tabs defaultActiveKey={caseType} onChange={changeTab}>
                {
                    tabPaneView(tabPaneValue)
                }
            </Tabs>
        </div>

    )
}

export default CaseLeftCommon;