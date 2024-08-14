import React from "react";
import {inject, observer} from "mobx-react";
import "../functionStyle.scss"
import CaseBread from "../../../../common/CaseBread";
import FunctionDetail from "../FunctionDetail";


const FunctionContentListView = (props) =>{
    const {funcUnitStore} = props;
    const {testCaseInfo} = funcUnitStore
    const functionId = sessionStorage.getItem('functionId');

    return(
        <div className={"content-box-center"}>
            <CaseBread
                icon={"gongneng1"}
                breadItem={[testCaseInfo?.name]}
            />
            <FunctionDetail functionId={functionId} />

        </div>


    )
}

export default inject('funcUnitStore')(observer(FunctionContentListView));