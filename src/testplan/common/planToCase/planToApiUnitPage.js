import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import ApiUnitEditPageCommon from "../../../test/api/http/unit/components/apiUnitEditPageCommon";
import CaseBread from "../../../common/CaseBread";
import PageCenter from "../../../common/pageContent/PageCenter";


const PlanToApiUnitPage = (props) =>{
    const {apiUnitStore} = props;
    const {findApiUnit} = apiUnitStore;

    const [caseInfo, setCaseInfo] = useState();
    const apiUnitId = sessionStorage.getItem('apiUnitId');
    const testPlanId = sessionStorage.getItem('testPlanId')

    useEffect(async ()=>{
        let res = await findApiUnit(apiUnitId)
        setCaseInfo(res.testCase);
    },[apiUnitId])

    return(
        <PageCenter>
            <div className={"content-box-center"}>
                <CaseBread
                    caseType={caseInfo?.caseType}
                    router={`/plan/${testPlanId}/case`}
                    breadItem={[caseInfo?.name]}
                />
                <ApiUnitEditPageCommon {...props} planType={true} apiUnitId={apiUnitId}/>
            </div>
        </PageCenter>
    )
}

export default inject("apiUnitStore")(observer(PlanToApiUnitPage));