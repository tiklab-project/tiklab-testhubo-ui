/**
 * @description：
 * @date: 2021-09-02 13:08
 */
import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import BackCommon from "../../../common/backCommon";
import AppSceneStepList from "./appSceneStepList";
import AppExecuteTestDrawer from "./appExecuteTestDrawer";
import DetailCommon from "../../../common/detailCommon";

const AppSceneDetail = (props) => {
    const {appSceneStore} = props;
    const {findAppScene,updateAppScene} = appSceneStore;

    const [detailInfo,setDetailInfo]=useState();
    const appSceneId = sessionStorage.getItem('appSceneId');

    useEffect(()=> {
        findAppScene(appSceneId).then(res=>{
            setDetailInfo(res);
        })
    },[appSceneId])

    //更新名称
    const updateTitle = (value) =>{
        const param = {
            id:detailInfo.id,
            testCase: {
                ...detailInfo.testCase,
                name:value,
            }
        }
        updateAppScene(param)
    }


    const goBack = () =>{
        props.history.push("/repositorypage/testcase/list")
    }


    const toHistory = () =>{
        props.history.push("/repositorypage/testcase/scenecase-instance")
    }

    return(
        <>
            {/*<BackCommon*/}
            {/*    clickBack={goBack}*/}
            {/*    // right={<AppEnvSelect history={props.history}/>}*/}
            {/*/>*/}
            <div className={"content-box-center"}>
                <DetailCommon
                    detailInfo={detailInfo}
                    updateTitle={updateTitle}
                    toHistory={toHistory}
                    test={
                        <AppExecuteTestDrawer
                            appSceneId={appSceneId}
                            appSceneStore={appSceneStore}
                        />
                    }
                />
                <AppSceneStepList />
            </div>
        </>
    )
}

export default inject('appSceneStore')(observer(AppSceneDetail));
