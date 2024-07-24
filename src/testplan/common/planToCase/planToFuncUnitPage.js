import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import FunctionDetail from "../../../test/function/components/FunctionDetail";
import CaseBread from "../../../common/CaseBread";
import PageContent from "../../../common/pageContent/PageContent";

const PlanToFuncUnitPage = (props) =>{
    const {funcUnitStore} = props;
    const {findFuncUnit} = funcUnitStore

    const [caseInfo, setCaseInfo] = useState();
    const functionId = sessionStorage.getItem('functionId');

    useEffect(()=>{
        findFuncUnit(functionId).then(res=>{
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
                <FunctionDetail functionId={functionId}/>
            </div>
        </PageContent>

    )
}

export default inject("funcUnitStore")(observer(PlanToFuncUnitPage));