import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import CaseBread from "../../../../../common/CaseBread";
import InstanceListCommon from "../../../../../testreport/common/InstanceListCommon";
import {CASE_TYPE} from "../../../../../common/dictionary/dictionary";
import {findCaseInstancePage} from "../../../../../testreport/common/instanceCommonFn";
import PageContent from "../../../../../common/pageContent/PageContent";

const ApiUnitInstanceList = (props) =>{
    const {apiUnitStore} = props
    const {testCaseInfo} = apiUnitStore

    const apiUnitId = sessionStorage.getItem("apiUnitId")

    useEffect(async()=>{
        await findCaseInstancePage(apiUnitId,CASE_TYPE.API_UNIT)
    },[])

    return (
        <PageContent>
            <div className={"content-box-center"}>
                <CaseBread
                    breadItem={[testCaseInfo?.name, "历史"]}
                    router={`/project/${apiUnitId}/apiUnit`}
                />
                <InstanceListCommon belongId={apiUnitId} type={CASE_TYPE.API_UNIT}/>
            </div>
        </PageContent>
    )
}

export default inject("apiUnitStore")(observer(ApiUnitInstanceList));