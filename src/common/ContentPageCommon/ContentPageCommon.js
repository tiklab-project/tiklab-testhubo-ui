import React from "react";
import {renderRoutes} from "react-router-config";
import "./ContentPageStyle.scss"

const ContentPageCommon = (props) =>{
    const {left} = props


    return(
        <div className={"ws-detail-contant"}>
            <div className={"ws-detail-left"}>
                {left}
            </div>
            <div className={"ws-detail-right"}>
                {
                    renderRoutes(props.route.routes)
                }
            </div>
        </div>
    )
}

export default ContentPageCommon;