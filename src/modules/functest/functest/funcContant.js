import React from "react";
import {renderRoutes} from "react-router-config";
import FuncLeftTree from "./appLeftTree";

const FuncContant =(props)=>{
    const routes = props.route.routes;

    return(
        <div className={"test-box"}>
            <div className={"test-left"}>
                <FuncLeftTree {...props}/>
            </div>
            <div className={"test-right"}>
                {
                    renderRoutes(routes)
                }
            </div>
        </div>
    )
}

export default FuncContant