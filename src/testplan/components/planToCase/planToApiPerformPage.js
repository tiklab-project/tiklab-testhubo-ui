import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import ApiPerformDetail from "../../../test/api/http/perf/components/apiPerformDetail";
import CaseBread from "../../../common/CaseBread";

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
        <>
            <CaseBread
                icon={"jiekou1"}
                title={caseInfo?.name}
                caseType={caseInfo?.caseType}
            />
            <ApiPerformDetail planType={true}/>
        </>
    )
}

export default inject("apiPerfStore","testPlanStore")(observer(PlanToApiPerformPage));