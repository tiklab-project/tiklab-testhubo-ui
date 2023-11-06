import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import ApiUnitEditPageCommon from "../../../test/api/http/unit/components/apiUnitEditPageCommon";
import CaseBread from "../../../common/CaseBread";


const PlanToApiUnitPage = (props) =>{
    const {apiUnitStore} = props;
    const {findApiUnit} = apiUnitStore;

    const [caseInfo, setCaseInfo] = useState();
    const apiUnitId = sessionStorage.getItem('apiUnitId');

    useEffect(async ()=>{
        let res = await findApiUnit(apiUnitId)
        setCaseInfo(res.testCase);
    },[apiUnitId])

    return(
        <div className={"content-box-center"}>
            <CaseBread
                title={caseInfo?.name}
                caseType={caseInfo?.caseType}
                // icon={"jiekou1"}
                breadItem={["计划详情","用例详情"]}
            />
            <div className={"content-box-center"}>
                <ApiUnitEditPageCommon {...props} planType={true}/>
            </div>
        </div>
    )
}

export default inject("apiUnitStore")(observer(PlanToApiUnitPage));