import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import WebSceneDetail from "../../../test/web/scene/components/webSceneDetail";
import CaseBread from "../../../common/CaseBread";
import PageContent from "../../../common/pageContent/PageContent";

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
        <PageContent>
            <div className={"content-box-center"}>
                <CaseBread
                    caseType={caseInfo?.caseType}
                    style={{borderBottom:"none"}}
                    router={"/plan/case"}
                    breadItem={[caseInfo?.name]}
                />
                <WebSceneDetail planType={true} webSceneId={webSceneId}/>
            </div>
        </PageContent>

    )
}

export default inject("webSceneStore")(observer(PlanToWebScenePage));