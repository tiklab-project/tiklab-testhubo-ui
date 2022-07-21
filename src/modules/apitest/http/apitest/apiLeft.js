import React from "react";
import {Tabs} from "antd";
import ApiUnitCategory from "../unitcase/components/apiUnitCategory";
import ApiSceneCategory from "../scenecase/components/apiSceneCategory";
import ApiPerformCategory from "../performcase/components/apiPerformCategory";
import {inject, observer} from "mobx-react";
const { TabPane } = Tabs;


const ApiLeft =(props) =>{
    const {categoryStore} = props;
    const {findCategoryListTree} = categoryStore;

    let addRouter = props.history.push;
    const caseType = localStorage.getItem("caseType")

    const routerData={
        "unit": "/repositorypage/apitest/unitcase",
        "scene": "/repositorypage/apitest/scenecase",
        "perform": "/repositorypage/apitest/performcase"
    }

    const switchRouter = (type)=>{

        switch (type){
            case "unit":
                addRouter(routerData.unit);
                break;
            case "scene":
                addRouter(routerData.scene);
                break;
            case "perform":
                addRouter(routerData.perform);
                break;
        }
    }


    let testType = localStorage.getItem("testType");
    let repositoryId = sessionStorage.getItem("repositoryId")

    const changeTab = (tabKey) =>{

        const params = {
            testType:testType,
            caseType:tabKey,
            repositoryId:repositoryId
        }
        findCategoryListTree(params)

        switchRouter(tabKey);

        localStorage.setItem("caseType",tabKey)
    }


    return(
        <>
            <div className={"case-tab"}>
                <Tabs onChange={changeTab} defaultActiveKey={caseType}>
                    <TabPane tab="测试用例" key="unit">
                        <ApiUnitCategory caseType={"unit"} addRouter={addRouter}/>
                    </TabPane>
                    <TabPane tab="场景用例" key="scene">
                        <ApiSceneCategory caseType={"scene"} addRouter={addRouter}/>
                    </TabPane>
                    <TabPane tab="性能用例" key="perform">
                        <ApiPerformCategory caseType={"perform"} addRouter={addRouter}/>
                    </TabPane>
                </Tabs>
            </div>
        </>
    )
}

export default inject("categoryStore")(observer(ApiLeft));