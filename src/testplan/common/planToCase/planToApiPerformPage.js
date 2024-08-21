import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import ApiPerformDetail from "../../../test/api/http/perf/components/apiPerformDetail";
import CaseBread from "../../../common/CaseBread";
import PageCenter from "../../../common/pageContent/PageCenter";

const PlanToApiPerformPage = (props) =>{
    const {apiPerfStore} = props;
    const {findApiPerf} = apiPerfStore

    const [caseInfo, setCaseInfo] = useState();
    const apiPerfId = sessionStorage.getItem('apiPerfId');
    const testPlanId = sessionStorage.getItem('testPlanId')

    useEffect(()=>{
        findApiPerf(apiPerfId).then(res=>{
            setCaseInfo(res.testCase);
        })
    },[])

    return(
        <PageCenter>
            <div className={"content-box-center"}>
                <CaseBread
                    caseType={caseInfo?.caseType}
                    style={{borderBottom:"none"}}
                    router={`/plan/${testPlanId}/case`}
                    breadItem={[caseInfo?.name]}
                />
                <ApiPerformDetail planType={true} apiPerfId={apiPerfId}/>
            </div>
        </PageCenter>

    )
}

export default inject("apiPerfStore","testPlanStore")(observer(PlanToApiPerformPage));