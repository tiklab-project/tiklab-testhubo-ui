import React from "react";
import {Tabs} from "antd";
import AppUnitCategory from "../unitcase/components/appUnitCategory";
import AppSceneCategory from "../scenecase/components/appSceneCategory";
import AppPerformCategory from "../performcase/components/appPerformCategory";
import {inject, observer} from "mobx-react";
const { TabPane } = Tabs;

const AppLeft =(props) =>{
    const {categoryStore} = props;
    const {findCategoryListTree} = categoryStore;

    let addRouter = props.history.push;
    const caseType = localStorage.getItem("caseType")

    const routerData={
        "unit": "/repositorypage/apptest/unitcase",
        "scene": "/repositorypage/apptest/scenecase",
        "perform": "/repositorypage/apptest/performcase"
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
        <div className={"case-tab"}>
            <Tabs defaultActiveKey={caseType} onChange={changeTab}>
                <TabPane tab="测试用例" key="unit">
                    <AppUnitCategory addRouter={addRouter} />
                </TabPane>
                <TabPane tab="场景用例" key="scene">
                    <AppSceneCategory addRouter={addRouter} />
                </TabPane>
                <TabPane tab="性能用例" key="perform">
                    <AppPerformCategory addRouter={addRouter} />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default inject("categoryStore")(observer(AppLeft));