import React, {useEffect, useState} from "react";
import DetailCommon from "../../../common/DetailCommon";
import Demand from "../../../integrated/teamwire/workItem/components/Demand";
import WorkItemBindList from "../../../integrated/teamwire/defect/components/WorkItemBindList";
import {inject, observer} from "mobx-react";

const FunctionDetail = (props) =>{
    const {funcUnitStore} = props;
    const {findFuncUnit,updateFuncUnit} = funcUnitStore;

    const [caseInfo,setCaseInfo]=useState();
    const [workItemId, setWorkItemId] = useState();

    const functionId = sessionStorage.getItem('functionId')

    useEffect(()=> {
        findFuncUnit(functionId).then(res=>{
            setCaseInfo(res);
            setWorkItemId(res?.testCase?.workItemId)
        })
    },[functionId])


    return(
        <>
            <div className={"detail-box"} style={{padding:"20px 0 "}}>
                <div className={"detail-bottom"}>
                    <span className={"detail-bottom-item "}>分组:{caseInfo?.testCase?.category?.name||"未设置"} </span>
                    <span className={"detail-bottom-item "}>更新者:{caseInfo?.testCase?.updateUser?.nickname||"未更新"}</span>
                    <span className={"detail-bottom-item "}>更新时间:{caseInfo?.testCase?.updateTime}</span>
                </div>
            </div>
            <div className={"case-title_weight"}>关联需求</div>
            <Demand
                workItemId={workItemId}
                caseInfo={caseInfo}
                updateFn={updateFuncUnit}
            />

            <div className={"case-title_weight"}>关联缺陷</div>
            <WorkItemBindList caseId={functionId} />
        </>
    )
}

export default inject('funcUnitStore')(observer(FunctionDetail));