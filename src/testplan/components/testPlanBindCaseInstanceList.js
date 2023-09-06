import React from "react";
import {Breadcrumb} from "antd";
import TestPlanBindCaseInstanceTable from "./testPlanBindCaseInstanceTable";

const TestPlanBindCaseInstanceList = (props) =>{


    const goToPlanInstance = () =>{
        props.history.push("/repository/plan/instance")
    }

    const goToPlanDetail = () =>{
        props.history.push("/repository/plan/detail")
    }

    return(
        <div className={"content-box-center"}>
            <TestPlanBindCaseInstanceTable />
        </div>
    )
}

export default TestPlanBindCaseInstanceList;