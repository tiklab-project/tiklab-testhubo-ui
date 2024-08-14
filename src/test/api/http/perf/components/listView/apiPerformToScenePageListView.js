import React from "react";
import {inject, observer} from "mobx-react";
import CaseBread from "../../../../../../common/CaseBread";
import ApiSceneDetail from "../../../scene/components/ApiSceneDetail";

const ApiPerformToScenePageListView = (props) =>{
    const apiSceneId = sessionStorage.getItem("apiSceneId")
    const repositoryId = sessionStorage.getItem("repositoryId")
    return(
        <div className={"content-box-center"}>
            <CaseBread
                breadItem={["接口性能","接口场景"]}
                router={`/project/${repositoryId}/testcaseList/apiPerform`}
            />
            <ApiSceneDetail apiSceneId={apiSceneId} />
        </div>
    )
}

export default inject("apiSceneStore","apiPerfStore")(observer(ApiPerformToScenePageListView));