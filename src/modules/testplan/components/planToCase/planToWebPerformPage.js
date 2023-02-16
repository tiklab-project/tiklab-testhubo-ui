import React, {useEffect, useState} from "react";
import {Breadcrumb} from "antd";
import {inject, observer} from "mobx-react";
import DetailCommon from "../../../common/detailCommon";
import WebPerformDetailCommon from "../../../webtest/performcase/components/webPerformDetailCommon";


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
        props.history.push("/repository/plan-detail")
    }


    return(
        <div className={"content-box-center"}>
            <div style={{"display":"flex","justifyContent":"space-between","margin":"5px  0 0 0"}}>
                <Breadcrumb className={"breadcrumb-box"} style={{padding: "10px 0"}}>
                    <Breadcrumb.Item onClick={toTestPlan} className={"first-item"}>测试计划</Breadcrumb.Item>
                    <Breadcrumb.Item onClick={toTestPlanDetail} className={"first-item"}>{testPlanName}</Breadcrumb.Item>
                    <Breadcrumb.Item>{webPerf?.testCase.name}</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <DetailCommon
                detailInfo={webPerf}
                updateTitle={updateTitle}
            />

            <WebPerformDetailCommon {...props}/>
        </div>
    )
}

export default inject("webPerfStore","testPlanStore")(observer(PlanToWebPerformPage));