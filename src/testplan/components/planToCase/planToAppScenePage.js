import React from "react";
import {inject, observer} from "mobx-react";
import AppSceneDetail from "../../../test/app/scene/components/appSceneDetail";

const PlanToAppScenePage = (props) =>{


    return(
        <>
            <AppSceneDetail />
        </>
    )
}

export default inject("appSceneStore","testPlanStore")(observer(PlanToAppScenePage));