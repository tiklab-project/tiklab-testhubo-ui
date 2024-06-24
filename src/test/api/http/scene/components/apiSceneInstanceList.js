import React, {useEffect} from "react";
import {observer} from "mobx-react";
import InstanceListCommon from "../../../../../testreport/common/InstanceListCommon";
import {CASE_TYPE} from "../../../../../common/dictionary/dictionary";
import {findCaseInstancePage} from "../../../../../testreport/common/instanceCommonFn";

const ApiSceneInstanceList = (props) =>{
    const apiSceneId = sessionStorage.getItem("apiSceneId")

    useEffect(async()=>{
        await findCaseInstancePage(apiSceneId,CASE_TYPE.API_SCENE)
    },[])

    return(
        <InstanceListCommon belongId={apiSceneId} type={CASE_TYPE.API_SCENE}/>
    )
}

export default observer(ApiSceneInstanceList);