import React from "react";
import {inject, observer} from "mobx-react";
import CaseBread from "../../../../../common/CaseBread";
import ApiUnitEditPageCommon from "../../unit/components/apiUnitEditPageCommon";
import PageContent from "../../../../../common/pageContent/PageContent";

const ApiPerformToUnitPage = (props) =>{

    const apiUnitId = sessionStorage.getItem("apiUnitId")
    const apiPerfId = sessionStorage.getItem("apiPerfId")
    return(
        <PageContent>
            <div className={"content-box-center"}>
                <CaseBread
                    breadItem={["接口性能","接口单元"]}
                    router={`/repository/api-perform/${apiPerfId}`}
                />
                <ApiUnitEditPageCommon {...props} apiUnitId={apiUnitId}/>
            </div>
        </PageContent>
    )
}

export default inject("apiUnitStore","apiPerfStore")(observer(ApiPerformToUnitPage));