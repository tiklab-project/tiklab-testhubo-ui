import React, {useEffect} from "react";
import {Breadcrumb} from "antd";
import {inject, observer} from "mobx-react";
import AppSceneStepList from "../../scene/components/AppSceneStepList";
import {DrawerCloseIcon} from "../../../common/BreadcrumbCommon";

const AppPerformToScenePage = (props) =>{
    const {appPerfStore,appSceneStore} = props;
    const {findAppScene} = appSceneStore;
    const {findAppPerf} = appPerfStore;

    const appSceneId = sessionStorage.getItem('appSceneId');
    const appPerfId = sessionStorage.getItem('appPerfId');

    useEffect(()=>{
        findAppScene(appSceneId)
    },[appSceneId])

    useEffect(async ()=>{
        await findAppPerf(appPerfId)
    },[appPerfId])

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