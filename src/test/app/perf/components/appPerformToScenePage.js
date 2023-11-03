import React, {useEffect, useState} from "react";
import {Breadcrumb} from "antd";
import {inject, observer} from "mobx-react";

import AppSceneStepList from "../../scene/components/appSceneStepListOld";
import DetailCommon from "../../../../common/DetailCommon";
import {useHistory} from "react-router";
import {DrawerCloseIcon} from "../../../common/BreadcrumbCommon";

const AppPerformToScenePage = (props) =>{
    const {appPerfStore,appSceneStore} = props;
    const {findAppScene,updateAppScene} = appSceneStore;
    const {findAppPerf} = appPerfStore;

    const history = useHistory();
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

    const toAppScene = () =>{
        props.history.push(`/repository/app-perform/${appSceneId}`)
    }


    return(
        <div className={"content-box-center"}>
            <div className={"breadcrumb-title_between"}>
                <Breadcrumb className={"breadcrumb-box"}>
                    <Breadcrumb.Item onClick={toAppScene} className={"first-item"}>用例详情</Breadcrumb.Item>
                    <Breadcrumb.Item >步骤详情</Breadcrumb.Item>
                </Breadcrumb>
                <DrawerCloseIcon />
            </div>


            <AppSceneStepList {...props}/>
        </div>
    )
}

export default inject("appSceneStore","appPerfStore")(observer(AppPerformToScenePage));