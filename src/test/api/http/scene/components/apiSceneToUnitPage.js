import React, {useEffect, useState} from "react";

import {inject, observer} from "mobx-react";
import ApiUnitEditPageCommon from "../../unit/components/apiUnitEditPageCommon";
import {DrawerCloseIcon} from "../../../../common/BreadcrumbCommon";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {useHistory} from "react-router";

const ApiSceneToUnitPage = (props) =>{

    let history = useHistory()

    return(
        <div className={"content-box-center"}>

            <div
                className={"breadcrumb-title_between"}
                style={{height:"36px"}}
            >
                <ArrowLeftOutlined onClick={()=>history.goBack()} style={{cursor:"pointer"}}/>

                <DrawerCloseIcon />
            </div>
            <ApiUnitEditPageCommon {...props} />
        </div>
    )
}

export default inject("apiSceneStore","apiUnitStore")(observer(ApiSceneToUnitPage));