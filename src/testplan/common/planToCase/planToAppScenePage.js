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
                caseType={caseInfo?.caseType}
                style={{borderBottom:"none"}}
                router={"/plan/case"}
                breadItem={[caseInfo?.name]}
            />
            <AppSceneDetail planType={true} appSceneId={appSceneId}/>
        </div>
    )
}

export default inject("appSceneStore")(observer(PlanToAppScenePage));