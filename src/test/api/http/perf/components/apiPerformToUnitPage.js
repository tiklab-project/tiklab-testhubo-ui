import React from "react";
import {inject, observer} from "mobx-react";
import CaseBread from "../../../../../common/CaseBread";
import ApiUnitEditPageCommon from "../../unit/components/apiUnitEditPageCommon";
import PageCenter from "../../../../../common/pageContent/PageCenter";

const ApiPerformToUnitPage = (props) =>{

    const apiUnitId = sessionStorage.getItem("apiUnitId")
    const apiPerfId = sessionStorage.getItem("apiPerfId")
    const repositoryId = sessionStorage.getItem("repositoryId")
    return(
        <PageCenter>
            <div className={"content-box-center"}>
                <CaseBread
                    breadItem={["接口性能","接口单元"]}
                    router={`/project/${repositoryId}/testcase/apiPerform/${apiPerfId}`}
                />
                <ApiUnitEditPageCommon {...props} apiUnitId={apiUnitId}/>
            </div>
        </PageCenter>
    )
}

export default inject("apiUnitStore","apiPerfStore")(observer(ApiPerformToUnitPage));