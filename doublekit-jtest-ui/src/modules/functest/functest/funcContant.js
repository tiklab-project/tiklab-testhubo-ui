import React from "react";
import CaseContantCommon from "../../common/caseCommon/caseContantCommon";
import FuncLeft from "./funcLeft";

const FuncContant =(props)=>{
    const routes = props.route.routes;

    return(
        <CaseContantCommon
            leftComponent={<FuncLeft {...props}/>}
            routes={routes}
        />
    )
}

export default FuncContant