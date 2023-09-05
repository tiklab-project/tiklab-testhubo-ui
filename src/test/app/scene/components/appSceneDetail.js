
import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import AppSceneStepList from "./appSceneStepList";
import "./appStyle.scss"
import {useHistory} from "react-router";
import { Button} from "antd";

const AppSceneDetail = (props) => {
    const {appSceneStore} = props;
    const {findAppScene} = appSceneStore;
    const [caseInfo,setCaseInfo]=useState();

    let history = useHistory()
    const appSceneId = sessionStorage.getItem('appSceneId');
    useEffect(()=> {
        findAppScene(appSceneId).then(res=>{
            setCaseInfo(res);
        })
    },[appSceneId])


    const toExePage = () =>{
        history.push("/repository/testcase/app-scene-execute")
    }

    return(
        < >
            <div className={"detail-box"} style={{padding:"20px 0 "}}>
                <div className={"detail-bottom"}>
                    <span className={"detail-bottom-item "}>分组:{caseInfo?.testCase?.category?.name||"未设置"} </span>
                    <span className={"detail-bottom-item "}>更新者:{caseInfo?.testCase?.updateUser?.nickname||"未更新"}</span>
                    <span className={"detail-bottom-item "}>更新时间:{caseInfo?.testCase?.updateTime}</span>
                </div>
            </div>
            <div className={"title-space-between"}>
                <div className={'test-title'}>
                    <div>场景步骤</div>
                </div>
                <Button className={"important-btn"} onClick={toExePage}>
                    测试
                </Button>
            </div>
            <AppSceneStepList />
        </>
    )
}

export default inject('appSceneStore')(observer(AppSceneDetail));
