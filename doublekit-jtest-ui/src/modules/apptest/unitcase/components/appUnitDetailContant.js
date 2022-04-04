import React from "react";
import TestDargCommon from "../../../common/testDargCommon";
import AppUnitDetail from "./appUnitDetail";
import AppUnitTest from "./appUnitTest";


const AppUnitDetailContant = (props) =>{

    return(
        <TestDargCommon
            top={<AppUnitDetail {...props}/>}
            bottom={<AppUnitTest />}
        />
    )
}

export default AppUnitDetailContant