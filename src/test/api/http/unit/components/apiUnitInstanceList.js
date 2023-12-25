import React from "react";
import {inject, observer} from "mobx-react";
import CaseBread from "../../../../../common/CaseBread";
import InstanceListCommon from "../../../../../testreport/common/InstanceListCommon";
import {CASE_TYPE} from "../../../../../common/dictionary/dictionary";

const ApiUnitInstanceList = (props) =>{
    const {apiUnitStore} = props
    const {testCaseInfo} = apiUnitStore

    const apiUnitId = sessionStorage.getItem("apiUnitId")

    return (
        <div className={"content-box-center"}>
            <CaseBread
                breadItem={[testCaseInfo?.name, "历史"]}
                router={`/repository/api-unit/${apiUnitId}`}
            />
            <InstanceListCommon belongId={apiUnitId} type={CASE_TYPE.API_UNIT}/>
        </div>


    )
}

export default inject("apiUnitStore")(observer(ApiUnitInstanceList));