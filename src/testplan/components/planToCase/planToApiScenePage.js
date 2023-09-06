import React, {useEffect, useState} from "react";
import {Breadcrumb} from "antd";
import {inject, observer} from "mobx-react";
import DetailCommon from "../../../common/DetailCommon";
import ApiSceneStepList from "../../../test/api/http/scene/components/apiSceneStepList";

const PlanToApiScenePage = (props) =>{
    const {testPlanStore,apiSceneStore} = props;
    const {findApiScene,updateApiScene} = apiSceneStore;
    const {findTestPlan} = testPlanStore;

    const [apiScene, setApiScene] = useState();
    const [testPlanName, setTestPlanName] = useState();
    const apiSceneId = sessionStorage.getItem('apiSceneId');
    const testPlanId = sessionStorage.getItem('testPlanId');


    useEffect(()=>{
        findApiScene(apiSceneId).then(res=>{
            setApiScene(res);
        })
    },[apiSceneId])

    useEffect(async ()=>{
        let res = await findTestPlan(testPlanId)
        setTestPlanName(res.name);

    },[testPlanId])


    //更新名称
    const updateTitle = (value) =>{
        const param = {
            id:setApiScene.id,
            testCase: {
                ...setApiScene.testCase,
                name:value,
            }
        }
        updateApiScene(param).then(()=>{
            findApiScene(apiSceneId).then(res=>{
                setApiScene(res);
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
                detailInfo={apiScene}
                updateTitle={updateTitle}
            />

            <ApiSceneStepList {...props}/>
        </div>
    )
}

export default inject("apiSceneStore","testPlanStore")(observer(PlanToApiScenePage));