import React from "react";
import TestPlanBindCaseInstanceTable from "../../testplan/instance/components/testPlanBindCaseInstanceTable";
import CaseBread from "../../common/CaseBread";
import PageCenter from "../../common/pageContent/PageCenter";

const TestReportDetail = (props) =>{
    const repositoryId = sessionStorage.getItem("repositoryId")

    return(
        <PageCenter>
            <div className={"content-box-center"}>
                <CaseBread
                    router={`/project/${repositoryId}/report`}
                    breadItem={["测试报告","报告详情"]}
                />
                <TestPlanBindCaseInstanceTable />
            </div>
        </PageCenter>
    )
}

export default TestReportDetail;