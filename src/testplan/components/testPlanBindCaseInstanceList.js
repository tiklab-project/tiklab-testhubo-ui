import React from "react";
import {Breadcrumb} from "antd";
import TestPlanBindCaseInstanceTable from "./testPlanBindCaseInstanceTable";
import CaseBread from "../../common/CaseBread";

const TestPlanBindCaseInstanceList = (props) =>{


    const goToPlanInstance = () =>{
        props.history.push("/repository/plan-instance")
    }

    const goToPlanDetail = () =>{
        props.history.push("/repository/plan/detail")
    }

    return(
        <div className={"content-box-center"}>
            <CaseBread title={"历史详情"}  hideClose={true}/>
            <TestPlanBindCaseInstanceTable />
        </div>
    )
}

export default TestPlanBindCaseInstanceList;