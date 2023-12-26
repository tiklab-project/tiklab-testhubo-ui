import React from "react";
import {observer} from "mobx-react";
import InstanceListCommon from "../common/InstanceListCommon";
import {CASE_TYPE} from "../../common/dictionary/dictionary";

const TestReportList = (props) =>{

    return(
        <div className={"content-box-center"}>
            <InstanceListCommon type={CASE_TYPE.TEST_REPORT} />
        </div>
    )
}

export default observer(TestReportList);