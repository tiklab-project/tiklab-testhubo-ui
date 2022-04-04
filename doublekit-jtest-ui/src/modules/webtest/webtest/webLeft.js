import React from "react";
import {Tabs} from "antd";
import WebUnitCategory from "../unitcase/components/webUnitCategory";
import WebSceneCategory from "../scenecase/components/webSceneCategory";
import WebPerformCategory from "../performcase/components/webPerformCategory";
const { TabPane } = Tabs;

const WebLeft =(props) =>{

    let addRouter = props.history.push;
    const caseType = localStorage.getItem("caseType")

    const routerData={
        "unitcase": "/repositorypage/webtest/unitcase",
        "scenecase": "/repositorypage/webtest/scenecase",
        "performcase": "/repositorypage/webtest/performcase"
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
                    <WebUnitCategory addRouter={addRouter} />
                </TabPane>
                <TabPane tab="场景用例" key="scenecase">
                    <WebSceneCategory addRouter={addRouter} />
                </TabPane>
                <TabPane tab="性能用例" key="performcase">
                    <WebPerformCategory addRouter={addRouter} />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default WebLeft;