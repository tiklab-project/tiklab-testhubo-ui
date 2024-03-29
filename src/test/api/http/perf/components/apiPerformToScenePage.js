import React from "react";
import {inject, observer} from "mobx-react";
import ApiSceneDetail from "../../scene/components/ApiSceneDetail";
import CaseBread from "../../../../../common/CaseBread";

const ApiPerformToScenePage = (props) =>{


    const apiSceneId = sessionStorage.getItem("apiSceneId")
    return(
        <div className={"content-box-center"}>
            <CaseBread
                breadItem={["接口性能","接口场景"]}
                router={"/repository/api-perform"}
            />
            <ApiSceneDetail apiSceneId={apiSceneId} />
        </div>
    )
}

export default inject("apiSceneStore","apiPerfStore")(observer(ApiPerformToScenePage));