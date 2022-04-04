import React from "react";
import {Tabs} from "antd";
import AppUnitCategory from "../unitcase/components/appUnitCategory";
import AppSceneCategory from "../scenecase/components/appSceneCategory";
import AppPerformCategory from "../performcase/components/appPerformCategory";
const { TabPane } = Tabs;

const AppLeft =(props) =>{

    let addRouter = props.history.push;
    const caseType = localStorage.getItem("caseType")

    const routerData={
        "unitcase": "/repositorypage/apptest/unitcase",
        "scenecase": "/repositorypage/apptest/scenecase",
        "performcase": "/repositorypage/apptest/performcase"
    }

    const switchRouter = (type)=>{
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



    return(
        <div className={"case-tab"}>
            <Tabs defaultActiveKey={caseType} onChange={changeTab}>
                <TabPane tab="测试用例" key="unitcase">
                    <AppUnitCategory addRouter={addRouter} />
                </TabPane>
                <TabPane tab="场景用例" key="scenecase">
                    <AppSceneCategory addRouter={addRouter} />
                </TabPane>
                <TabPane tab="性能用例" key="performcase">
                    <AppPerformCategory addRouter={addRouter} />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default AppLeft;