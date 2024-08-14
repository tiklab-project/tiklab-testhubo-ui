import React from "react";
import {inject, observer} from "mobx-react";
import ApiSceneDetail from "../../scene/components/ApiSceneDetail";
import CaseBread from "../../../../../common/CaseBread";
import PageContent from "../../../../../common/pageContent/PageContent";

const ApiPerformToScenePage = (props) =>{


    const apiSceneId = sessionStorage.getItem("apiSceneId")
    const apiPerfId = sessionStorage.getItem("apiPerfId")
    return(
        <PageContent>
        <div className={"content-box-center"}>
            <CaseBread
                breadItem={["接口性能","接口场景"]}
                router={`/project/${apiPerfId}/apiPerform`}
            />
            <ApiSceneDetail apiSceneId={apiSceneId} />
        </div>
        </PageContent>
    )
}

export default inject("apiSceneStore","apiPerfStore")(observer(ApiPerformToScenePage));