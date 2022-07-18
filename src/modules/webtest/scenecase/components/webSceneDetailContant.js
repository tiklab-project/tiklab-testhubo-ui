import React from "react";
import TestDargCommon from "../../../common/testDargCommon";
import WebSceneDetail from "./webSceneDetail";
import WebSceneTest from "./webSceneTest";


const WebSceneDetailContant = (props) =>{

    return(
        <TestDargCommon
            top={<WebSceneDetail {...props}/>}
            // bottom={<WebSceneTest />}
        />
    )
}

export default WebSceneDetailContant