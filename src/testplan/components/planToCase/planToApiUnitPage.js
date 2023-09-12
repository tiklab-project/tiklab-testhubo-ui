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
        <>
            <CaseBread
                icon={"jiekou1"}
                title={caseInfo?.name}
                caseType={caseInfo?.caseType}
            />
            <div className={"content-box-center"}>
                <ApiUnitEditPageCommon {...props} planType={true}/>
            </div>
        </>
    )
}

export default inject("apiUnitStore")(observer(PlanToApiUnitPage));