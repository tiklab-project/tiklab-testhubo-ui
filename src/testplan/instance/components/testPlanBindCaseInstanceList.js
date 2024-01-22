import React from "react";
import TestPlanBindCaseInstanceTable from "./testPlanBindCaseInstanceTable";
import CaseBread from "../../../common/CaseBread";

const TestPlanBindCaseInstanceList = (props) =>{

    return(
        <div className={"content-box-center"}>
            <CaseBread
                router={"/plan/instance"}
                breadItem={["测试历史","历史详情"]}
            />
            <TestPlanBindCaseInstanceTable />
        </div>
    )
}

export default TestPlanBindCaseInstanceList;