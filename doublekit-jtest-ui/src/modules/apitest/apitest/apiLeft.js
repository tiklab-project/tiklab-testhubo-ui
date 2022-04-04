import React from "react";
import {Tabs} from "antd";
import ApiUnitCategory from "../unitcase/components/apiUnitCategory";
import ApiSceneCategory from "../scenecase/components/apiSceneCategory";
import ApiPerformCategory from "../performcase/components/apiPerformCategory";
const { TabPane } = Tabs;

const ApiLeft =(props) =>{

    let addRouter = props.history.push;
    const caseType = localStorage.getItem("caseType")

    const routerData={
        "unitcase": "/repositorypage/apitest/unitcase",
        "scenecase": "/repositorypage/apitest/scenecase",
        "performcase": "/repositorypage/apitest/performcase"
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
        <>
            <div className={"case-tab"}>
                <Tabs defaultActiveKey={caseType} onChange={changeTab}>
                    <TabPane tab="测试用例" key="unitcase">
                        <ApiUnitCategory addRouter={addRouter}/>
                    </TabPane>
                    <TabPane tab="场景用例" key="scenecase">
                        <ApiSceneCategory addRouter={addRouter}/>
                    </TabPane>
                    <TabPane tab="性能用例" key="performcase">
                        <ApiPerformCategory addRouter={addRouter}/>
                    </TabPane>
                </Tabs>
            </div>
        </>

    )
}

export default ApiLeft;