import React from "react";
import TestDargCommon from "../../../common/testDargCommon";
import ApiPerformDetail from "./apiPerformDetail";
import ApiPerformTest from "./apiPerformTest";

const ApiPerfomDetailContant = (props) =>{

    return(
        <TestDargCommon
            top={<ApiPerformDetail {...props}/>}
            bottom={<ApiPerformTest />}
        />
    )
}

export default ApiPerfomDetailContant