import React from "react";
import CaseLeftCommon from "../../common/caseCommon/caseLeftCommon";

const AppLeft =(props) =>{

    const routerData={
        "unitcase": "/repositorypage/apptest/unitcase",
        "scenecase": "/repositorypage/apptest/scenecase",
        "performcase": "/repositorypage/apptest/performcase"
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

export default AppLeft;