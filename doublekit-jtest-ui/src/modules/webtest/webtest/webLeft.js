import React from "react";
import CaseLeftCommon from "../../common/caseCommon/caseLeftCommon";

const WebLeft =(props) =>{

    const routerData={
        "unitcase": "/repositorypage/webtest/unitcase",
        "scenecase": "/repositorypage/webtest/scenecase",
        "performcase": "/repositorypage/webtest/performcase"
    }

    const tabPaneValue = [
        {
            name:"测试用例",
            key:"unitcase"
        },{
            name:"场景用例",
            key:"scenecase"
        },{
            name:"性能用例",
            key:"performcase"
        }
    ]


    return(
        <CaseLeftCommon
            routerData={routerData}
            tabPaneValue={tabPaneValue}
            {...props}
        />
    )
}

export default WebLeft;