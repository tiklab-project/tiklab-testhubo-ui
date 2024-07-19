import React from "react";
import {inject, observer} from "mobx-react";
import CaseBread from "../../../../../../common/CaseBread";
import ApiSceneDetail from "../../../scene/components/ApiSceneDetail";

const ApiPerformToScenePageListView = (props) =>{


    const apiSceneId = sessionStorage.getItem("apiSceneId")
    const apiPerfId = sessionStorage.getItem("apiPerfId")
    return(
        <div className={"content-box-center"}>
            <CaseBread
                breadItem={["接口性能","接口场景"]}
                router={`/repository/testcase-list/api-perform/${apiPerfId}`}
            />
            <ApiSceneDetail apiSceneId={apiSceneId} />
        </div>
    )
}

export default inject("apiSceneStore","apiPerfStore")(observer(ApiPerformToScenePageListView));