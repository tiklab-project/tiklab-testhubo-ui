import React from "react";
import CaseContantCommon from "../../common/caseCommon/caseContantCommon";
import ApiLeft from "./apiLeft";

const ApiContant =(props)=>{
    const routes = props.route.routes;

    return(
        <CaseContantCommon
            leftComponent={<ApiLeft {...props}/>}
            routes={routes}
        />
    )
}

export default ApiContant