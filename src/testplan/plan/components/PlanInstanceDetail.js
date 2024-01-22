import React from "react";
import CaseBread from "../../../common/CaseBread";
import TestPlanBindCaseInstanceTable from "../../instance/components/testPlanBindCaseInstanceTable";


const PlanInstanceDetail = (props) =>{

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

export default PlanInstanceDetail;