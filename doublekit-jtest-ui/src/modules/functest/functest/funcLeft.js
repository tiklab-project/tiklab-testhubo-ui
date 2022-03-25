import React from "react";
import CaseLeftCommon from "../../common/caseCommon/caseLeftCommon";

const FuncLeft =(props) =>{

    const routerData={
        "unitcase": "/repositorypage/functest/unitcase",
        "scenecase": "/repositorypage/functest/scenecase",
    }

    const tabPaneValue = [
        {
            name:"测试用例",
            key:"unitcase"
        },{
            name:"场景用例",
            key:"scenecase"
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

export default FuncLeft;