import React, {useEffect} from "react";
import {observer} from "mobx-react";
import InstanceListCommon from "../../../testreport/common/InstanceListCommon";
import {CASE_TYPE} from "../../../common/dictionary/dictionary";
import {findCaseInstancePage} from "../../../testreport/common/instanceCommonFn";
import PageContent from "../../../common/pageContent/PageContent";

const TestPlanInstanceList = (props) =>{
    const testPlanId = sessionStorage.getItem("testPlanId")

    useEffect(async()=>{
        await findCaseInstancePage(testPlanId,CASE_TYPE.TEST_PLAN)
    },[])

    return(
        <PageContent>
        <div className={"content-box-center"}>
            <div  className={"header-box-space-between"} >
                <div className={'header-box-title'}>测试历史</div>

            </div>
            <InstanceListCommon belongId={testPlanId} type={CASE_TYPE.TEST_PLAN}/>
        </div>
        </PageContent>
    )
}

export default observer(TestPlanInstanceList);