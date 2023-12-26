import React from "react";
import ApiPerfInstanceTable from "./apiPerfInstanceTable";;
import CaseBread from "../../../../../common/CaseBread";
import {inject, observer} from "mobx-react";
import InstanceListCommon from "../../../../../testreport/common/InstanceListCommon";
import {CASE_TYPE} from "../../../../../common/dictionary/dictionary";

const ApiPerfInstanceList = (props) =>{
    const {apiPerfStore} = props;
    const {testCaseInfo} = apiPerfStore
    const apiPerfId = sessionStorage.getItem("apiPerfId")


    return(
        <div className={"content-box-center"}>
            <CaseBread
                breadItem={[testCaseInfo?.name,"历史"]}
                router={`/repository/api-perform/${apiPerfId}`}
            />
            <InstanceListCommon belongId={apiPerfId} type={CASE_TYPE.API_PERFORM}/>
        </div>
    )
}

export default inject('apiPerfStore')(observer(ApiPerfInstanceList));