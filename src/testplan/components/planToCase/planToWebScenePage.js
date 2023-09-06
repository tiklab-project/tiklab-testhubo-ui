import React, {useEffect, useState} from "react";
import {Breadcrumb} from "antd";
import {inject, observer} from "mobx-react";
import DetailCommon from "../../../common/DetailCommon";
import WebSceneStepList from "../../../test/web/scene/components/webSceneStepList";

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
          props.history.push(`/repository/plan/${testPlanId}`)
    }


    return(
        <div className={"content-box-center"}>

            <DetailCommon
                detailInfo={webScene}
                updateTitle={updateTitle}
            />

            <WebSceneStepList {...props}/>
        </div>
    )
}

export default inject("webSceneStore","testPlanStore")(observer(PlanToWebScenePage));