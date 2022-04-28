import React from "react";
import ApiLeft from "./apiLeft";
import {renderRoutes} from "react-router-config";
import "./caseContantStyle.scss"

const ApiContant =(props)=>{
    const routes = props.route.routes;

    return(
        <div className={"test-box"}>
            <div className={"test-left"}>
                <ApiLeft {...props}/>
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