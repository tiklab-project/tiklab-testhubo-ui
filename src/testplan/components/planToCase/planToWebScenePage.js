import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import WebSceneDetail from "../../../test/web/scene/components/webSceneDetail";
import CaseBread from "../../../common/CaseBread";

const PlanToWebScenePage = (props) =>{
    const {webSceneStore} = props;
    const {findWebScene} = webSceneStore

    const [caseInfo, setCaseInfo] = useState();
    const webSceneId = sessionStorage.getItem('webSceneId');

    useEffect(()=>{
        findWebScene(webSceneId).then(res=>{
            setCaseInfo(res.testCase);
        })
    },[])

    return(
        <>
            <CaseBread
                icon={"diannao"}
                title={caseInfo?.name}
                caseType={caseInfo?.caseType}
                style={{
                    borderBottom:"none"
                }}
            />
            <WebSceneDetail planType={true}/>
        </>
    )
}

export default inject("webSceneStore")(observer(PlanToWebScenePage));