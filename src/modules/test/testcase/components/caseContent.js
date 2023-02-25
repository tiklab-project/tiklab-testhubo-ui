import React from "react";
import {renderRoutes} from "react-router-config";
import LeftTree from "../../../category/components/leftTree";

const CaseContent =(props)=>{
    const routes = props.route.routes;

    return(
        <div className={"test-box"}>
            <div className={"test-left"}>
                <LeftTree {...props}/>
            </div>
            <div className={"test-right"}>
                {
                    renderRoutes(routes)
                }
            </div>
        </div>
    )
}

export default CaseContent