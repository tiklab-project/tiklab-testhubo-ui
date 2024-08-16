import React from "react";
import {inject, observer} from "mobx-react";
import ApiSceneDetail from "../../scene/components/ApiSceneDetail";
import CaseBread from "../../../../../common/CaseBread";
import PageContent from "../../../../../common/pageContent/PageContent";

const ApiPerformToScenePage = (props) =>{


    const apiSceneId = sessionStorage.getItem("apiSceneId")
    const apiPerfId = sessionStorage.getItem("apiPerfId")
    const repositoryId = sessionStorage.getItem("repositoryId")
    return(
        <PageContent>
        <div className={"content-box-center"}>
            <CaseBread
                breadItem={["接口性能","接口场景"]}
                router={`/project/${repositoryId}/testcase/apiPerform/${apiPerfId}`}
            />
            <ApiSceneDetail apiSceneId={apiSceneId} />
        </div>
        </PageContent>
    )
}

export default inject("apiSceneStore","apiPerfStore")(observer(ApiPerformToScenePage));