import React, {useEffect, useState} from "react";
import {Breadcrumb} from "antd";
import {inject, observer} from "mobx-react";
import DetailCommon from "../../../../../common/DetailCommon";
import ApiSceneStepList from "../../scene/components/apiSceneStepList";

const ApiPerformToScenePage = (props) =>{
    const {apiPerfStore,apiSceneStore} = props;
    const {findApiScene,updateApiScene} = apiSceneStore;
    const {findApiPerf} = apiPerfStore;

    const [apiScene, setApiScene] = useState();
    const [apiPerfName, setApiPerfName] = useState();
    const apiSceneId = sessionStorage.getItem('apiSceneId');
    const apiPerfId = sessionStorage.getItem('apiPerfId');


    useEffect(()=>{
        findApiScene(apiSceneId).then(res=>{
            setApiScene(res);
        })
    },[apiSceneId])

    useEffect(async ()=>{
        let res = await findApiPerf(apiPerfId)
        setApiPerfName(res.testCase.name);

    },[apiPerfId])


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

    const toTestCase = () =>{
        props.history.push("/repository/testcase")
    }


    const toApiScene = () =>{
        props.history.push("/repository/api-scene-detail")
    }



    return(
        <div className={"content-box-center"}>
            <div style={{"display":"flex","justifyContent":"space-between","margin":"5px  0 0 0"}}>
                <Breadcrumb className={"breadcrumb-box"} style={{padding: "10px 0"}}>
                    <Breadcrumb.Item onClick={toTestCase} className={"first-item"}>测试用例</Breadcrumb.Item>
                    <Breadcrumb.Item onClick={toApiScene} className={"first-item"}>{apiPerfName}</Breadcrumb.Item>
                    <Breadcrumb.Item>{apiScene?.testCase.name}</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <DetailCommon
                detailInfo={apiScene}
                updateTitle={updateTitle}
            />

            <ApiSceneStepList {...props}/>
        </div>
    )
}

export default inject("apiSceneStore","apiPerfStore")(observer(ApiPerformToScenePage));