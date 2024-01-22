import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import DetailCommon from "../../../common/caseCommon/DetailCommon";
import WebPerformDetailCommon from "../../../test/web/perf/components/webPerformDetailCommon";


const PlanToWebPerformPage = (props) =>{
    const {testPlanStore,webPerfStore} = props;
    const {findWebPerf,updateWebPerf} = webPerfStore;
    const {findTestPlan} = testPlanStore;

    const [webPerf, setWebPerf] = useState();
    const [testPlanName, setTestPlanName] = useState();
    const webPerfId = sessionStorage.getItem('webPerfId');
    const testPlanId = sessionStorage.getItem('testPlanId');


    useEffect(()=>{
        findWebPerf(webPerfId).then(res=>{
            setWebPerf(res);
        })
    },[webPerfId])

    useEffect(async ()=>{
        let res = await findTestPlan(testPlanId)
        setTestPlanName(res.name);

    },[testPlanId])


    //更新名称
    const updateTitle = (value) =>{
        const param = {
            id:setWebPerf.id,
            testCase: {
                ...setWebPerf.testCase,
                name:value,
            }
        }
        updateWebPerf(param).then(()=>{
            findWebPerf(webPerfId).then(res=>{
                setWebPerf(res);
            })
        })
    }

    const toTestPlan = () =>{
        props.history.push("/repository/plan")
    }


    const toTestPlanDetail = () =>{
          props.history.push(`/repository/plan/${testPlanId}`)
    }


    return(
        <div className={"content-box-center"}>

            <DetailCommon
                detailInfo={webPerf}
                updateCase={updateTitle}
            />

            <WebPerformDetailCommon {...props}/>
        </div>
    )
}

export default inject("webPerfStore","testPlanStore")(observer(PlanToWebPerformPage));