import React from "react";
import TestPlanBindCaseInstanceTable from "../../testplan/instance/components/testPlanBindCaseInstanceTable";
import CaseBread from "../../common/CaseBread";
import PageContent from "../../common/pageContent/PageContent";

const TestReportDetail = (props) =>{
    const repositoryId = sessionStorage.getItem("repositoryId")

    return(
        <PageContent>
            <div className={"content-box-center"}>
                <CaseBread
                    router={`/project/${repositoryId}/report`}
                    breadItem={["测试报告","报告详情"]}
                />
                <TestPlanBindCaseInstanceTable />
            </div>
        </PageContent>
    )
}

export default TestReportDetail;