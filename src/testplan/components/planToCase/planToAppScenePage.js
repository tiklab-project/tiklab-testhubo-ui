import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import AppSceneDetail from "../../../test/app/scene/components/appSceneDetail";
import CaseBread from "../../../common/CaseBread";

const PlanToAppScenePage = (props) =>{
    const {appSceneStore} = props;
    const {findAppScene} = appSceneStore

    const [caseInfo, setCaseInfo] = useState();
    const appSceneId = sessionStorage.getItem('appSceneId');

    useEffect(()=>{
        findAppScene(appSceneId).then(res=>{
            setCaseInfo(res.testCase);
        })
    },[])

    return(
        <div className={"content-box-center"}>
            <CaseBread
                title={caseInfo?.name}
                caseType={caseInfo?.caseType}
                style={{borderBottom:"none"}}
                // icon={"shouji"}
                breadItem={["计划详情","用例详情"]}
            />
            <AppSceneDetail planType={true} />
        </div>
    )
}

export default inject("appSceneStore")(observer(PlanToAppScenePage));