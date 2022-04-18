import React from "react";
import TestDargCommon from "../../../common/testDargCommon";
import AppPerformDetail from "./appPerformDetail";
import AppPerformTest from "./appPerformTest";


const AppPerformDetailContant = (props) =>{

    return(
        <TestDargCommon
            top={<AppPerformDetail {...props}/>}
            bottom={<AppPerformTest />}
        />
    )
}

export default AppPerformDetailContant