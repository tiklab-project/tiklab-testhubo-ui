/**
 * @description：
 * @date: 2021-09-02 13:08
 */
import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import BackCommon from "../../../common/backCommon";
import AppSceneStepList from "./appSceneStepList";
import {Button} from "antd";
import AppEnvSelect from "../../apptest/appEnvSelect";
import AppExecuteTestDrawer from "./appExecuteTestDrawer";

const AppSceneDetail = (props) => {
    const {appSceneStore} = props;
    const {findAppScene,updateAppScene} = appSceneStore;
    const [allValue,setAllValue] = useState();


    const appSceneId = sessionStorage.getItem('appSceneId');

    useEffect(()=> {
        findAppScene(appSceneId).then(res=>{
            setAllValue(res);
        })
    },[appSceneId])



    const goBack = () =>{
        props.history.push("/repositorypage/apptest")
    }


    const toHistory = () =>{
        props.history.push("/repositorypage/apptest/scenecase-instance")
    }

    return(
        <>
            <BackCommon
                clickBack={goBack}
                // right={<AppEnvSelect history={props.history}/>}
            />
            <div className={'testcase-detail'}>
                <div className="apidetail-header-btn">
                    <div className={"method-name"}>{allValue?.testCase?.name}</div>
                    <div className={'apidetail-title-tool'}>
                        <Button onClick={toHistory}>历史</Button>
                        {/*<Button className="important-btn" onClick={actionTest}>测试</Button>*/}
                        <AppExecuteTestDrawer
                            appSceneId={appSceneId}
                            appSceneStore={appSceneStore}
                        />
                    </div>
                </div>
                <div className={"method"}>
                   
                    <div className={"method-people-info"}>
                        <span className={"people-item "}>分组: {allValue?.testCase?.category?.name}</span>
                        <span className={"people-item "}>创建人: {allValue?.testCase?.createUser?.name}</span>
                        <span className={"people-item "}>更新者: {allValue?.testCase?.updateUser?.name}</span>
                        <span className={"people-item "}>更新时间: {allValue?.testCase?.updateTime}</span>
                    </div>
                </div>
            </div>

            <AppSceneStepList />

        </>
    )
}

export default inject('appSceneStore')(observer(AppSceneDetail));
