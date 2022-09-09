import React from "react";
import {renderRoutes} from "react-router-config";
import "./webStyle.scss"
import WebLeftTree from "./webLeftTree";
const WebContant =(props)=>{
    const routes = props.route.routes;

    return(
        <div className={"test-box"}>
            <div className={"test-left"}>
                <WebLeftTree {...props}/>
            </div>
            <div className={"test-right"}>
                {
                    renderRoutes(routes)
                }
            </div>
        </div>
    )
}

export default WebContant