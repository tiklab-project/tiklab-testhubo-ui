import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import FunctionDetail from "../../../test/function/components/FunctionDetail";
import CaseBread from "../../../common/CaseBread";

const PlanToFuncUnitPage = (props) =>{
    const {funcUnitStore} = props;
    const {findFuncUnit} = funcUnitStore

    const [caseInfo, setCaseInfo] = useState();
    const funcUnitId = sessionStorage.getItem('functionId');

    useEffect(()=>{
        findFuncUnit(funcUnitId).then(res=>{
            setCaseInfo(res.testCase);
        })
    },[])

    return(
        <div className={"content-box-center"}>
            <CaseBread
                title={caseInfo?.name}
                caseType={caseInfo?.caseType}
                style={{borderBottom:"none"}}
                // icon={"gongneng"}
                breadItem={["计划详情","用例详情"]}
            />
            <FunctionDetail />

        </div>
    )
}

export default inject("funcUnitStore")(observer(PlanToFuncUnitPage));