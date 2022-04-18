import React from "react";
import TestDargCommon from "../../../common/testDargCommon";
import WebPerformDetail from "./webPerformDetail";
import WebPerformTest from "./webPerformTest";


const WebPerformDetailContant = (props) =>{

    return(
        <TestDargCommon
            top={<WebPerformDetail {...props}/>}
            bottom={<WebPerformTest />}
        />
    )
}

export default WebPerformDetailContant