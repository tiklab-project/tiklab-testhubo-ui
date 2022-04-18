import React from "react";
import {Tabs} from "antd";
import FuncUnitCategory from "../unitcase/components/funcUnitCategory";
import FuncSceneCategory from "../scenecase/components/funcSceneCategory";
import {inject, observer} from "mobx-react";
const { TabPane } = Tabs;

const FuncLeft =(props) =>{
    const {categoryStore} = props;
    const {findCategoryListTree} = categoryStore;

    let addRouter = props.history.push;
    const caseType = localStorage.getItem("caseType")

    const routerData={
        "unit": "/repositorypage/functest/unitcase",
        "scene": "/repositorypage/functest/scenecase",
    }


    const switchRouter = (type)=>{
        switch (type){
            case "unit":
                addRouter(routerData.unit);
                break;
            case "scene":
                addRouter(routerData.scene);
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
                    <FuncUnitCategory  addRouter={addRouter}/>
                </TabPane>
                <TabPane tab="场景用例" key="scene">
                    <FuncSceneCategory addRouter={addRouter} />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default inject("categoryStore")(observer(FuncLeft));