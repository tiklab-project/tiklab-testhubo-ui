import React from "react";
import {inject, observer} from "mobx-react";
import CaseBread from "../../../../../../common/CaseBread";
import ApiUnitEditPageCommon from "../../../unit/components/apiUnitEditPageCommon";

const ApiPerformToUnitPageListView = (props) =>{
    const repositoryId = sessionStorage.getItem("repositoryId")
    const apiUnitId = sessionStorage.getItem("apiUnitId")
    return(
        <div className={"content-box-center"}>
            <CaseBread
                breadItem={["接口性能","接口单元"]}
                router={`/project/${repositoryId}/testcaseList/apiPerform`}
            />
            <ApiUnitEditPageCommon {...props} apiUnitId={apiUnitId}/>
        </div>
    )
}

export default inject("apiUnitStore","apiPerfStore")(observer(ApiPerformToUnitPageListView));