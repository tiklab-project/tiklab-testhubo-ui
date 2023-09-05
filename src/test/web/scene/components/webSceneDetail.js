
import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import WebSceneStepList from "./webSceneStepList";
import "./webStyle.scss"
import {useHistory} from "react-router";
import { Button} from "antd";

const WebSceneDetail = (props) => {
    const {webSceneStore} = props;
    const {findWebScene} = webSceneStore;
    const [caseInfo,setCaseInfo]=useState();

    let history = useHistory()
    const webSceneId = sessionStorage.getItem('webSceneId');
    useEffect(()=> {
        findWebScene(webSceneId).then(res=>{
            setCaseInfo(res);
        })
    },[webSceneId])


    const toExePage = () =>{
        history.push("/repository/testcase/web-scene-execute")
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
            <WebSceneStepList />
        </>
    )
}

export default inject('webSceneStore')(observer(WebSceneDetail));
