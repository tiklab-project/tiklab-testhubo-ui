import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import FunctionDetail from "../../../test/function/components/FunctionDetail";
import CaseBread from "../../../common/CaseBread";
import PageCenter from "../../../common/pageContent/PageCenter";

const PlanToFuncUnitPage = (props) =>{
    const {funcUnitStore} = props;
    const {findFuncUnit} = funcUnitStore

    const [caseInfo, setCaseInfo] = useState();
    const functionId = sessionStorage.getItem('functionId');
    const testPlanId = sessionStorage.getItem('testPlanId')
    useEffect(()=>{
        findFuncUnit(functionId).then(res=>{
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
                <FunctionDetail functionId={functionId}/>
            </div>
        </PageCenter>

    )
}

export default inject("funcUnitStore")(observer(PlanToFuncUnitPage));