import React, {useEffect, useState} from "react";
import {Breadcrumb} from "antd";
import {inject, observer} from "mobx-react";

import WebSceneStepList from "../../scene/components/webSceneStepList";
import DetailCommon from "../../../../common/detailCommon";

const WebPerformToScenePage = (props) =>{
    const {webPerfStore,webSceneStore} = props;
    const {findWebScene,updateWebScene} = webSceneStore;
    const {findWebPerf} = webPerfStore;

    const [webScene, setWebScene] = useState();
    const [webPerfName, setWebPerfName] = useState();
    const webSceneId = sessionStorage.getItem('webSceneId');
    const webPerfId = sessionStorage.getItem('webPerfId');


    useEffect(()=>{
        findWebScene(webSceneId).then(res=>{
            setWebScene(res);
        })
    },[webSceneId])

    useEffect(async ()=>{
        let res = await findWebPerf(webPerfId)
        setWebPerfName(res.testCase.name);

    },[webPerfId])


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

    const toTestCase = () =>{
        props.history.push("/repository/testcase")
    }


    const toWebScene = () =>{
        props.history.push("/repository/web-scene-detail")
    }



    return(
        <div className={"content-box-center"}>
            <div style={{"display":"flex","justifyContent":"space-between","margin":"5px  0 0 0"}}>
                <Breadcrumb className={"breadcrumb-box"} style={{padding: "10px 0"}}>
                    <Breadcrumb.Item onClick={toTestCase} className={"first-item"}>测试用例</Breadcrumb.Item>
                    <Breadcrumb.Item onClick={toWebScene} className={"first-item"}>{webPerfName}</Breadcrumb.Item>
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

export default inject("webSceneStore","webPerfStore")(observer(WebPerformToScenePage));