import React from "react";
import CaseContantCommon from "../../common/caseCommon/caseContantCommon";
import WebLeft from "./webLeft";

const WebContant =(props)=>{
    const routes = props.route.routes;

    return(
        <CaseContantCommon
            leftComponent={<WebLeft {...props}/>}
            routes={routes}
        />
    )
}

export default WebContant