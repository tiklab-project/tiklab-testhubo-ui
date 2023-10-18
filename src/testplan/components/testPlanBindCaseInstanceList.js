import React from "react";
import TestPlanBindCaseInstanceTable from "./testPlanBindCaseInstanceTable";
import CaseBread from "../../common/CaseBread";

const TestPlanBindCaseInstanceList = (props) =>{



    return(
        <div className={"content-box-center"}>
            <CaseBread breadItem={["计划详情","历史详情"]} />
            <TestPlanBindCaseInstanceTable />
        </div>
    )
}

export default TestPlanBindCaseInstanceList;