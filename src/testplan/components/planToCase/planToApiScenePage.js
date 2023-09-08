import React, {useEffect, useState} from "react";
import {Breadcrumb} from "antd";
import {inject, observer} from "mobx-react";
import ApiSceneDetail from "../../../test/api/http/scene/components/ApiSceneDetail";

const PlanToApiScenePage = (props) =>{

    return(
        <>
            <ApiSceneDetail />
        </>
    )
}

export default inject("apiSceneStore","testPlanStore")(observer(PlanToApiScenePage));