import React from "react";
import ApiPerfInstanceTable from "./apiPerfInstanceTable";;
import CaseBread from "../../../../../common/CaseBread";
import {inject, observer} from "mobx-react";

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
            <ApiPerfInstanceTable apiPerfId={apiPerfId}/>
        </div>
    )
}

export default inject('apiPerfStore')(observer(ApiPerfInstanceList));