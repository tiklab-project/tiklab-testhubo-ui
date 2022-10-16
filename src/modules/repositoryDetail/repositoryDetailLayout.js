import React from "react";
import LeftNav from "./leftNav";
import "./repositoryDetailStyle.scss"
import {renderRoutes} from "react-router-config";

//详情的布局，为左右结构
const RepositoryDetailLayout = (props) =>{
    const routes = props.route.routes;

    return(
        <div className={"ws-detail-contant"}>
            <div className={"ws-detail-left"}>
                <LeftNav {...props}/>
            </div>
            <div className={"ws-detail-right"}>
                {
                    renderRoutes(routes)
                }
            </div>
        </div>
    )
}

export default RepositoryDetailLayout;

