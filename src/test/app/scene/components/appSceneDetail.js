
import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import AppSceneStepList from "./appSceneStepList";
import "./appStyle.scss"
import {useHistory} from "react-router";
import {Button, Space} from "antd";
import IconBtn from "../../../../common/iconBtn/IconBtn";

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
        <div className={"content-box-center"}>
            <div
                className={"detail-box"}
                style={{
                    padding:"20px 0",
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"space-between"
                }}
            >
                <div className={"detail-bottom"}>
                    <span className={"detail-bottom-item "}>分组:{caseInfo?.testCase?.category?.name||"未设置"} </span>
                    <span className={"detail-bottom-item "}>更新者:{caseInfo?.testCase?.updateUser?.nickname||"未更新"}</span>
                    <span className={"detail-bottom-item "}>更新时间:{caseInfo?.testCase?.updateTime}</span>
                </div>
                <Space>
                    <IconBtn
                        className="pi-icon-btn-grey"
                        icon={"lishi"}
                        onClick={()=>history.push("/repository/testcase/app-scene-instance")}
                        name={"历史"}
                    />
                    <Button className={"important-btn"} onClick={toExePage}>
                        测试
                    </Button>
                </Space>
            </div>
            <div className={"title-space-between"}>
                <div className={'test-title'}>
                    <div>场景步骤</div>
                </div>
            </div>
            <AppSceneStepList />
        </div>
    )
}

export default inject('appSceneStore')(observer(AppSceneDetail));
