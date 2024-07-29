import React from "react";
import "./testcaseListViewStyle.scss";
import CaseListLeft from "./CaseListLeft";
import {renderRoutes} from "react-router-config";

const TestcaseListMain = (props) =>{


    return(
        <div className={"case-list-main"}>
            <div className={"case-list-left"}>
                <CaseListLeft />
            </div>
            <div
                className={"case-list-right"}
                // style={{
                //     backgroundImage: `url(${emptyImg})`,
                //     backgroundPosition: "center",
                //     backgroundRepeat: "no-repeat"
                // }}
            >
                {
                    renderRoutes(props.route.routes)
                }
            </div>
        </div>
    )
}
export default TestcaseListMain;