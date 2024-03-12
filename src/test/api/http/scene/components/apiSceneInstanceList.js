import React from "react";
import {inject, observer} from "mobx-react";
import CaseBread from "../../../../../common/CaseBread";
import InstanceListCommon from "../../../../../testreport/common/InstanceListCommon";
import {CASE_TYPE} from "../../../../../common/dictionary/dictionary";

const ApiSceneInstanceList = (props) =>{
    const {apiSceneStore} = props;
    const {testCaseInfo} = apiSceneStore

    const apiSceneId = sessionStorage.getItem("apiSceneId")

    return(
        <div className={"content-box-center"}>
            <CaseBread
                breadItem={[testCaseInfo?.name,"历史"]}
                router={`/repository/api-scene/${apiSceneId}`}
            />
            <InstanceListCommon belongId={apiSceneId} type={CASE_TYPE.API_SCENE}/>

        </div>
    )
}

export default inject("apiSceneStore")(observer(ApiSceneInstanceList));