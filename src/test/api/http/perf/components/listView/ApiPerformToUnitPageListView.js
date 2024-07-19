import React from "react";
import {inject, observer} from "mobx-react";
import CaseBread from "../../../../../../common/CaseBread";
import ApiUnitEditPageCommon from "../../../unit/components/apiUnitEditPageCommon";

const ApiPerformToUnitPageListView = (props) =>{

    const apiUnitId = sessionStorage.getItem("apiUnitId")
    const apiPerfId = sessionStorage.getItem("apiPerfId")
    return(
        <div className={"content-box-center"}>
            <CaseBread
                breadItem={["接口性能","接口单元"]}
                router={`/repository/testcase-list/api-perform/${apiPerfId}`}
            />
            <ApiUnitEditPageCommon {...props} apiUnitId={apiUnitId}/>
        </div>
    )
}

export default inject("apiUnitStore","apiPerfStore")(observer(ApiPerformToUnitPageListView));