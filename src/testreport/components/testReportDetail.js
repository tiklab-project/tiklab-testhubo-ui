import React from "react";
import TestPlanBindCaseInstanceTable from "../../testplan/components/testPlanBindCaseInstanceTable";
import CaseBread from "../../common/CaseBread";

const TestReportDetail = (props) =>{

    return(
        <div className={"content-box-center"}>
            <CaseBread
                router={"/repository/report"}
                breadItem={["测试报告","报告详情"]}
            />
            <TestPlanBindCaseInstanceTable />
        </div>
    )
}

export default TestReportDetail;