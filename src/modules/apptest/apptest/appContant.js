import React from "react";
import {renderRoutes} from "react-router-config";
import AppLeftTree from "./appLeftTree";

const AppContant =(props)=>{
    const routes = props.route.routes;

    return(
        <div className={"test-box"}>
            <div className={"test-left"}>
                <AppLeftTree {...props}/>
            </div>
            <div className={"test-right"}>
                {
                    renderRoutes(routes)
                }
            </div>
        </div>
    )
}

export default AppContant