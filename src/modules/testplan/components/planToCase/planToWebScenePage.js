import React, {useEffect, useState} from "react";
import {Breadcrumb} from "antd";
import {inject, observer} from "mobx-react";
import DetailCommon from "../../../common/detailCommon";
import WebSceneStepList from "../../../webtest/scenecase/components/webSceneStepList";

const PlanToWebScenePage = (props) =>{
    const {testPlanStore,webSceneStore} = props;
    const {findWebScene,updateWebScene} = webSceneStore;
    const {findTestPlan} = testPlanStore;

    const [webScene, setWebScene] = useState();
    const [testPlanName, setTestPlanName] = useState();
    const webSceneId = sessionStorage.getItem('webSceneId');
    const testPlanId = sessionStorage.getItem('testPlanId');


    useEffect(()=>{
        findWebScene(webSceneId).then(res=>{
            setWebScene(res);
        })
    },[webSceneId])

    useEffect(async ()=>{
        let res = await findTestPlan(testPlanId)
        setTestPlanName(res.name);

    },[testPlanId])


    //更新名称
    const updateTitle = (value) =>{
        const param = {
            id:setWebScene.id,
            testCase: {
                ...setWebScene.testCase,
                name:value,
            }
        }
        updateWebScene(param).then(()=>{
            findWebScene(webSceneId).then(res=>{
                setWebScene(res);
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
                    <Breadcrumb.Item>{webScene?.testCase.name}</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <DetailCommon
                detailInfo={webScene}
                updateTitle={updateTitle}
            />

            <WebSceneStepList {...props}/>
        </div>
    )
}

export default inject("webSceneStore","testPlanStore")(observer(PlanToWebScenePage));