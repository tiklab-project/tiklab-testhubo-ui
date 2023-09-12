import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import ApiSceneDetail from "../../../test/api/http/scene/components/ApiSceneDetail";
import CaseBread from "../../../common/CaseBread";

const PlanToApiScenePage = (props) =>{
    const {apiSceneStore} = props;
    const {findApiScene} = apiSceneStore

    const [caseInfo, setCaseInfo] = useState();
    const apiSceneId = sessionStorage.getItem('apiSceneId');

    useEffect(()=>{
        findApiScene(apiSceneId).then(res=>{
            setCaseInfo(res.testCase);
        })
    },[])

    return(
        <>
            <CaseBread
                icon={"jiekou1"}
                style={{
                    borderBottom:"none"
                }}
                title={caseInfo?.name}
                caseType={caseInfo?.caseType}
            />
            <ApiSceneDetail planType={true}/>
        </>
    )
}

export default inject("apiSceneStore")(observer(PlanToApiScenePage));