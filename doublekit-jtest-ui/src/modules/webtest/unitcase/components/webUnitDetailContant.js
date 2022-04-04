import React from "react";
import TestDargCommon from "../../../common/testDargCommon";
import WebUnitDetail from "./webUnitDetail";
import WebUnitTest from "./webUnitTest";


const WebUnitDetailContant = (props) =>{

    return(
        <TestDargCommon
            top={<WebUnitDetail {...props}/>}
            bottom={<WebUnitTest />}
        />
    )
}

export default WebUnitDetailContant