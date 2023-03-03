import React, {useEffect, useState} from "react";
import {Breadcrumb} from "antd";
import {inject, observer} from "mobx-react";
import DetailCommon from "../../../common/DetailCommon";
import AppSceneStepList from "../../../test/app/scene/components/appSceneStepList";

const PlanToAppScenePage = (props) =>{
    const {testPlanStore,appSceneStore} = props;
    const {findAppScene,updateAppScene} = appSceneStore;
    const {findTestPlan} = testPlanStore;

    const [appScene, setAppScene] = useState();
    const [testPlanName, setTestPlanName] = useState();
    const appSceneId = sessionStorage.getItem('appSceneId');
    const testPlanId = sessionStorage.getItem('testPlanId');


    useEffect(()=>{
        findAppScene(appSceneId).then(res=>{
            setAppScene(res);
        })
    },[appSceneId])

    useEffect(async ()=>{
        let res = await findTestPlan(testPlanId)
        setTestPlanName(res.name);

    },[testPlanId])


    //更新名称
    const updateTitle = (value) =>{
        const param = {
            id:setAppScene.id,
            testCase: {
                ...setAppScene.testCase,
                name:value,
            }
        }
        updateAppScene(param).then(()=>{
            findAppScene(appSceneId).then(res=>{
                setAppScene(res);
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
                    <Breadcrumb.Item>{appScene?.testCase.name}</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <DetailCommon
                detailInfo={appScene}
                updateTitle={updateTitle}
            />

            <AppSceneStepList {...props}/>
        </div>
    )
}

export default inject("appSceneStore","testPlanStore")(observer(PlanToAppScenePage));