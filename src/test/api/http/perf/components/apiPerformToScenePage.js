import React from "react";
import {inject, observer} from "mobx-react";
import {DrawerCloseIcon} from "../../../../common/BreadcrumbCommon";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {useHistory} from "react-router";
import ApiSceneDetail from "../../scene/components/ApiSceneDetail";

const ApiPerformToScenePage = (props) =>{

    let history = useHistory()

    return(
        <>
            <div
                className={"breadcrumb-title_between"}
                style={{height:"36px"}}
            >
                <ArrowLeftOutlined onClick={()=>history.goBack()} style={{cursor:"pointer"}}/>

                <DrawerCloseIcon />
            </div>
            <ApiSceneDetail />
        </>
    )
}

export default inject("apiSceneStore","apiPerfStore")(observer(ApiPerformToScenePage));