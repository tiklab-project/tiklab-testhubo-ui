import React from "react";
import {Breadcrumb} from "antd";
import TestPlanBindCaseInstanceTable from "../testplan/components/testPlanBindCaseInstanceTable";
import CaseBread from "../common/CaseBread";

const TestReportDetail = (props) =>{

    const goToReport = () =>{
        props.history.push("/repository/report")
    }

    return(
        <div className={"content-box-center"}>
            <CaseBread
                // title={caseInfo?.name}
                // caseType={caseInfo?.caseType}
                // icon={"jiekou1"}
                breadItem={["测试报告","报告详情"]}
            />
            <TestPlanBindCaseInstanceTable />
        </div>
    )
}

export default TestReportDetail;