import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import ApiPerformDetail from "../../../test/api/http/perf/components/apiPerformDetail";
import CaseBread from "../../../common/CaseBread";
import PageContent from "../../../common/pageContent/PageContent";

const PlanToApiPerformPage = (props) =>{
    const {apiPerfStore} = props;
    const {findApiPerf} = apiPerfStore

    const [caseInfo, setCaseInfo] = useState();
    const apiPerfId = sessionStorage.getItem('apiPerfId');

    useEffect(()=>{
        findApiPerf(apiPerfId).then(res=>{
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
                <ApiPerformDetail planType={true} apiPerfId={apiPerfId}/>
            </div>
        </PageContent>

    )
}

export default inject("apiPerfStore","testPlanStore")(observer(PlanToApiPerformPage));