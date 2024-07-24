import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import ApiSceneDetail from "../../../test/api/http/scene/components/ApiSceneDetail";
import CaseBread from "../../../common/CaseBread";
import PageContent from "../../../common/pageContent/PageContent";

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
        <PageContent>
            <div className={"content-box-center"}>
                <CaseBread
                    style={{borderBottom:"none"}}
                    caseType={caseInfo?.caseType}
                    router={"/plan/case"}
                    breadItem={[caseInfo?.name]}
                />
                <ApiSceneDetail planType={true} apiSceneId={apiSceneId}/>
            </div>
        </PageContent>

    )
}

export default inject("apiSceneStore")(observer(PlanToApiScenePage));