import React from "react";
import {Tabs} from "antd";
import FuncUnitCategory from "../unitcase/components/funcUnitCategory";
import FuncSceneCategory from "../scenecase/components/funcSceneCategory";
const { TabPane } = Tabs;

const FuncLeft =(props) =>{

    let addRouter = props.history.push;
    const caseType = localStorage.getItem("caseType")

    const routerData={
        "unitcase": "/repositorypage/functest/unitcase",
        "scenecase": "/repositorypage/functest/scenecase",
    }

    const tabPaneValue = [
        {
            name:"测试用例",
            key:"unitcase"
        },{
            name:"场景用例",
            key:"scenecase"
        }
    ]


    const switchRouter = (type)=>{

        switch (type){
            case "unitcase":
                addRouter(routerData.unitcase);
                break;
            case "scenecase":
                addRouter(routerData.scenecase);
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
                    <FuncUnitCategory  addRouter={addRouter}/>
                </TabPane>
                <TabPane tab="场景用例" key="scenecase">
                    <FuncSceneCategory addRouter={addRouter} />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default FuncLeft;