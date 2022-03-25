import React, {useEffect} from "react";
import {renderRoutes} from "react-router-config";
import CaseLeftCommon from "./caseLeftCommon";
import "./caseContantCommonStyle.scss"

//api,web,app,function;最外层架子
const CaseContantCommon = (props) =>{

    return(
        <div className={"test-box"}>
            <div className={"test-left"}>
                {props.leftComponent}
            </div>
            <div className={"test-right"}>
                {
                    renderRoutes(props.routes)
                }
            </div>
        </div>
    )
}

export default CaseContantCommon;