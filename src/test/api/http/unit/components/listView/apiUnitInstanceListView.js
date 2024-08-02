import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import {findCaseInstancePage} from "../../../../../../testreport/common/instanceCommonFn";
import {CASE_TYPE} from "../../../../../../common/dictionary/dictionary";
import CaseBread from "../../../../../../common/CaseBread";
import InstanceListCommon from "../../../../../../testreport/common/InstanceListCommon";

const ApiUnitInstanceListView = (props) =>{
    const {apiUnitStore} = props
    const {testCaseInfo} = apiUnitStore

    const apiUnitId = sessionStorage.getItem("apiUnitId")

    useEffect(async()=>{
        await findCaseInstancePage(apiUnitId,CASE_TYPE.API_UNIT)
    },[])

    return (
        <div className={"content-box-center"}>
            <CaseBread
                breadItem={[testCaseInfo?.name, "历史"]}
                router={`/repository/testcase-list/api-unit/${apiUnitId}`}
            />
            <InstanceListCommon belongId={apiUnitId} type={CASE_TYPE.API_UNIT}/>
        </div>
    )
}

export default inject("apiUnitStore")(observer(ApiUnitInstanceListView));