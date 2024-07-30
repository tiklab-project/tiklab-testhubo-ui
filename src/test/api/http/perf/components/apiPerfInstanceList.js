import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import InstanceListCommon from "../../../../../testreport/common/InstanceListCommon";
import {CASE_TYPE} from "../../../../../common/dictionary/dictionary";
import {findCaseInstancePage} from "../../../../../testreport/common/instanceCommonFn";

const ApiPerfInstanceList = ({actionTap}) =>{

    const apiPerfId = sessionStorage.getItem("apiPerfId")

    useEffect(async()=>{
        if(actionTap==="history"){
            await findCaseInstancePage(apiPerfId,CASE_TYPE.API_PERFORM)
        }
    },[apiPerfId,actionTap])

    return(
        <div style={{margin:"15px 0"}}>
            <InstanceListCommon belongId={apiPerfId} type={CASE_TYPE.API_PERFORM}/>
        </div>
    )
}

export default inject('apiPerfStore')(observer(ApiPerfInstanceList));