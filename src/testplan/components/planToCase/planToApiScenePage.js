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
        <div className={"content-box-center"}>
            <CaseBread
                style={{borderBottom:"none"}}
                title={caseInfo?.name}
                caseType={caseInfo?.caseType}
                // icon={"jiekou1"}
                breadItem={["计划详情","用例详情"]}
            />
            <ApiSceneDetail planType={true}/>
        </div>
    )
}

export default inject("apiSceneStore")(observer(PlanToApiScenePage));