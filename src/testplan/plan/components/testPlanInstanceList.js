import React from "react";
import {observer} from "mobx-react";
import InstanceListCommon from "../../../testreport/common/InstanceListCommon";
import {CASE_TYPE} from "../../../common/dictionary/dictionary";

const TestPlanInstanceList = (props) =>{

    const testPlanId = sessionStorage.getItem("testPlanId")

    return(
        <div className={"content-box-center"}>
            <div  className={"header-box-space-between"} >
                <div className={'header-box-title'}>测试历史</div>

            </div>
            <InstanceListCommon belongId={testPlanId} type={CASE_TYPE.TEST_PLAN}/>

        </div>
    )
}

export default observer(TestPlanInstanceList);