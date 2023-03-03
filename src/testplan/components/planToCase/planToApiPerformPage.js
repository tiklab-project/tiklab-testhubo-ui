import React, {useEffect, useState} from "react";
import {Breadcrumb} from "antd";
import {inject, observer} from "mobx-react";
import DetailCommon from "../../../common/DetailCommon";
import ApiPerformDetailCommon from "../../../test/api/http/perf/components/apiPerformDetailCommon";

const PlanToApiPerformPage = (props) =>{
    const {testPlanStore,apiPerfStore} = props;
    const {findApiPerf,updateApiPerf} = apiPerfStore;
    const {findTestPlan} = testPlanStore;

    const [apiPerf, setApiPerf] = useState();
    const [testPlanName, setTestPlanName] = useState();
    const apiPerfId = sessionStorage.getItem('apiPerfId');
    const testPlanId = sessionStorage.getItem('testPlanId');


    useEffect(()=>{
        findApiPerf(apiPerfId).then(res=>{
            setApiPerf(res);
        })
    },[apiPerfId])

    useEffect(async ()=>{
        let res = await findTestPlan(testPlanId)
        setTestPlanName(res.name);

    },[testPlanId])


    //更新名称
    const updateTitle = (value) =>{
        const param = {
            id:setApiPerf.id,
            testCase: {
                ...setApiPerf.testCase,
                name:value,
            }
        }
        updateApiPerf(param).then(()=>{
            findApiPerf(apiPerfId).then(res=>{
                setApiPerf(res);
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
                    <Breadcrumb.Item>{apiPerf?.testCase.name}</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <DetailCommon
                detailInfo={apiPerf}
                updateTitle={updateTitle}
            />
            <ApiPerformDetailCommon  {...props}/>

        </div>
    )
}

export default inject("apiPerfStore","testPlanStore")(observer(PlanToApiPerformPage));