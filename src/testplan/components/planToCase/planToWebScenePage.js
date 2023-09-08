import React from "react";
import {inject, observer} from "mobx-react";
import WebSceneDetail from "../../../test/web/scene/components/webSceneDetail";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {DrawerCloseIcon} from "../../../test/common/BreadcrumbCommon";

const PlanToWebScenePage = (props) =>{

    return(
        <>
            <WebSceneDetail />
        </>
    )
}

export default inject("webSceneStore","testPlanStore")(observer(PlanToWebScenePage));