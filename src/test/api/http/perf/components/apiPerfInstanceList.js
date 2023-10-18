import React from "react";
import ApiPerfInstanceTable from "./apiPerfInstanceTable";;
import CaseBread from "../../../../../common/CaseBread";

const ApiPerfInstanceList = (props) =>{

    const apiPerfId = sessionStorage.getItem("apiPerfId")


    return(
        <div className={"content-box-center"}>
            <CaseBread breadItem={["用例列表","用例详情","用例历史"]}/>
            <ApiPerfInstanceTable apiPerfId={apiPerfId}/>
        </div>
    )
}

export default ApiPerfInstanceList;