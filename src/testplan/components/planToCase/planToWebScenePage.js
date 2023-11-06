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
        <div className={"content-box-center"}>
            <CaseBread
                // icon={"diannao"}
                title={caseInfo?.name}
                caseType={caseInfo?.caseType}
                style={{borderBottom:"none"}}
                breadItem={["计划详情","用例详情"]}
            />
            <WebSceneDetail planType={true}/>
        </div>
    )
}

export default inject("webSceneStore")(observer(PlanToWebScenePage));