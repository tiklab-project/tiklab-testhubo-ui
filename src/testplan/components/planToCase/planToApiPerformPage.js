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
        <div className={"content-box-center"}>
            <CaseBread
                // title={caseInfo?.name}
                caseType={caseInfo?.caseType}
                style={{borderBottom:"none"}}
                // icon={"jiekou1"}
                breadItem={["测试用例","用例详情"]}
            />
            <ApiPerformDetail planType={true} apiPerfId={apiPerfId}/>
        </div>
    )
}

export default inject("apiPerfStore","testPlanStore")(observer(PlanToApiPerformPage));