import React, {useEffect, useState} from "react";
import {Breadcrumb} from "antd";
import {inject, observer} from "mobx-react";

import AppSceneStepList from "../../scenecase/components/appSceneStepList";
import DetailCommon from "../../../common/detailCommon";

const AppPerformToScenePage = (props) =>{
    const {appPerfStore,appSceneStore} = props;
    const {findAppScene,updateAppScene} = appSceneStore;
    const {findAppPerf} = appPerfStore;

    const [appScene, setAppScene] = useState();
    const [appPerfName, setAppPerfName] = useState();
    const appSceneId = sessionStorage.getItem('appSceneId');
    const appPerfId = sessionStorage.getItem('appPerfId');


    useEffect(()=>{
        findAppScene(appSceneId).then(res=>{
            setAppScene(res);
        })
    },[appSceneId])

    useEffect(async ()=>{
        let res = await findAppPerf(appPerfId)
        setAppPerfName(res.testCase.name);

    },[appPerfId])


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

    const toTestCase = () =>{
        props.history.push("/repository/testcase")
    }


    const toAppScene = () =>{
        props.history.push("/repository/app-perform-detail")
    }



    return(
        <div className={"content-box-center"}>
            <div style={{"display":"flex","justifyContent":"space-between","margin":"5px  0 0 0"}}>
                <Breadcrumb className={"breadcrumb-box"} style={{padding: "10px 0"}}>
                    <Breadcrumb.Item onClick={toTestCase} className={"first-item"}>测试用例</Breadcrumb.Item>
                    <Breadcrumb.Item onClick={toAppScene} className={"first-item"}>{appPerfName}</Breadcrumb.Item>
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

export default inject("appSceneStore","appPerfStore")(observer(AppPerformToScenePage));