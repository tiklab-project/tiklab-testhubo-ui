import React, {useEffect} from "react";
import {observer} from "mobx-react";
import InstanceListCommon from "../common/InstanceListCommon";
import {CASE_TYPE} from "../../common/dictionary/dictionary";
import {findCaseInstancePage} from "../common/instanceCommonFn";
import PageCenter from "../../common/pageContent/PageCenter";

const TestReportList = (props) =>{
    const repositoryId = sessionStorage.getItem("repositoryId")

    useEffect(async()=>{
        await findCaseInstancePage(null, null,  { repositoryId:repositoryId });
    },[])


    return(
        <PageCenter>
            <div className={"content-box-center"}>
                <InstanceListCommon type={CASE_TYPE.TEST_REPORT} {...props} />
            </div>
        </PageCenter>
    )
}

export default observer(TestReportList);