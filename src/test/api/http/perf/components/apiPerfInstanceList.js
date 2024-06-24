import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import InstanceListCommon from "../../../../../testreport/common/InstanceListCommon";
import {CASE_TYPE} from "../../../../../common/dictionary/dictionary";
import {findCaseInstancePage} from "../../../../../testreport/common/instanceCommonFn";

const ApiPerfInstanceList = (props) =>{

    const apiPerfId = sessionStorage.getItem("apiPerfId")

    useEffect(async()=>{
        await findCaseInstancePage(apiPerfId,CASE_TYPE.API_PERFORM)
    },[])

    return(
        <div className={"content-box-center"}>
            <InstanceListCommon belongId={apiPerfId} type={CASE_TYPE.API_PERFORM}/>
        </div>
    )
}

export default inject('apiPerfStore')(observer(ApiPerfInstanceList));