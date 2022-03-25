import React from "react";
import CaseContantCommon from "../../common/caseCommon/caseContantCommon";
import AppLeft from "./appLeft";

const AppContant =(props)=>{
    const routes = props.route.routes;

    return(
        <CaseContantCommon
            leftComponent={<AppLeft {...props}/>}
            routes={routes}
        />
    )
}

export default AppContant