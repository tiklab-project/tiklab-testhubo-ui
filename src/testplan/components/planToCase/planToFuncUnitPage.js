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
        <>
            <CaseBread
                icon={"gongneng"}
                title={caseInfo?.name}
                caseType={caseInfo?.caseType}
                style={{
                    borderBottom:"none"
                }}
            />
            <FunctionDetail />

        </>
    )
}

export default inject("funcUnitStore")(observer(PlanToFuncUnitPage));