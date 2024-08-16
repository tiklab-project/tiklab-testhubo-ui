import React from "react";
import TestPlanBindCaseInstanceTable from "./testPlanBindCaseInstanceTable";
import CaseBread from "../../../common/CaseBread";
import PageContent from "../../../common/pageContent/PageContent";

const TestPlanBindCaseInstanceList = (props) =>{

    return(
        <PageContent>
            <div className={"content-box-center"}>
                <CaseBread
                    router={`/plan/${sessionStorage.getItem("testPlanId")}/instance`}
                    breadItem={["测试历史","历史详情"]}
                />
                <TestPlanBindCaseInstanceTable {...props} />
            </div>
        </PageContent>
    )
}

export default TestPlanBindCaseInstanceList;