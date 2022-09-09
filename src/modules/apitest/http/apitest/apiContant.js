import React from "react";
import {renderRoutes} from "react-router-config";
import "./caseContantStyle.scss"
import "../unitcase/components/unitcase.scss"
import ApiLeftTree from "./apiLeftTree";

const ApiContant =(props)=>{
    const routes = props.route.routes;

    return(
        <div className={"test-box"}>
            <div className={"test-left"}>
                <ApiLeftTree {...props}/>
            </div>
            <div className={"test-right"}>
                {
                    renderRoutes(routes)
                }
            </div>
        </div>
    )
}

export default ApiContant