import React from "react";
import TestPlanBindCaseInstanceTable from "./testPlanBindCaseInstanceTable";
import CaseBread from "../../../common/CaseBread";
import PageCenter from "../../../common/pageContent/PageCenter";

const TestPlanBindCaseInstanceList = (props) =>{

    return(
        <PageCenter>
            <div className={"content-box-center"}>
                <CaseBread
                    router={`/plan/${sessionStorage.getItem("testPlanId")}/instance`}
                    breadItem={["测试历史","历史详情"]}
                />
                <TestPlanBindCaseInstanceTable {...props} />
            </div>
        </PageCenter>
    )
}

export default TestPlanBindCaseInstanceList;