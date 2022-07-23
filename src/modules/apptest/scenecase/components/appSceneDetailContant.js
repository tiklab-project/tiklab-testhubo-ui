import React from "react";
import TestDargCommon from "../../../common/testDargCommon";
import AppSceneDetail from "./appSceneDetail";
// import AppSceneTest from "./appSceneTest";


const AppSceneDetailContant = (props) =>{

    return(
        <TestDargCommon
            top={<AppSceneDetail {...props}/>}
            // bottom={<AppSceneTest />}
        />
    )
}

export default AppSceneDetailContant