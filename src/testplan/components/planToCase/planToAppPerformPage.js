import React, {useEffect, useState} from "react";
import {Breadcrumb} from "antd";
import {inject, observer} from "mobx-react";
import DetailCommon from "../../../common/DetailCommon";
import AppPerfStepList from "../../../test/app/perf/components/appPerfStepList";
import AppPerformDetailCommon from "../../../test/app/perf/components/appPerformDetailCommon";


const PlanToAppPerformPage = (props) =>{
    const {testPlanStore,appPerfStore} = props;
    const {findAppPerf,updateAppPerf} = appPerfStore;
    const {findTestPlan} = testPlanStore;

    const [appPerf, setAppPerf] = useState();
    const [testPlanName, setTestPlanName] = useState();
    const appPerfId = sessionStorage.getItem('appPerfId');
    const testPlanId = sessionStorage.getItem('testPlanId');


    useEffect(()=>{
        findAppPerf(appPerfId).then(res=>{
            setAppPerf(res);
        })
    },[appPerfId])

    useEffect(async ()=>{
        let res = await findTestPlan(testPlanId)
        setTestPlanName(res.name);

    },[testPlanId])


    //更新名称
    const updateTitle = (value) =>{
        const param = {
            id:setAppPerf.id,
            testCase: {
                ...setAppPerf.testCase,
                name:value,
            }
        }
        updateAppPerf(param).then(()=>{
            findAppPerf(appPerfId).then(res=>{
                setAppPerf(res);
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
                detailInfo={appPerf}
                updateCase={updateCase}
            />

            <AppPerformDetailCommon {...props}/>
        </div>
    )
}

export default inject("appPerfStore","testPlanStore")(observer(PlanToAppPerformPage));