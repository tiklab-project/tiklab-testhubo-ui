import React, {useEffect, useState} from "react";
import StepAssertCommon from "../../../common/stepassert/StepAssert";
import {observer} from "mobx-react";
import stepAssertCommonStore from "../../../common/store/StepAssertCommonStore";

const StepAssertApp = (props) =>{
    const {stepId} = props;
    const {findStepAssertCommonList} =stepAssertCommonStore

    useEffect(async ()=>{
        let params={stepId:stepId}
        await findStepAssertCommonList(params)
    },[])

    return(
        <StepAssertCommon
            stepId={stepId}
        />
    )
}

export default observer(StepAssertApp)