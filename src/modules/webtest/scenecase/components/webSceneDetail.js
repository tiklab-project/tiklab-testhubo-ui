
import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import BackCommon from "../../../common/backCommon";
import WebSceneStepList from "./webSceneStepList";
import {Button} from "antd";
import ExecuteTestDrawer from "./executeTestDrawer";

const WebSceneDetail = (props) => {
    const {webSceneStore} = props;
    const {findWebScene} = webSceneStore;

    const [allValue,setAllValue] = useState();

    const webSceneId = sessionStorage.getItem('webSceneId');

    useEffect(()=> {
        findWebScene(webSceneId).then(res=>{
            setAllValue(res);
        })
    },[webSceneId])


    const goBack = () =>{
        props.history.push("/repositorypage/webtest/scenecase")
    }

    const toHistory = () =>{
        props.history.push("/repositorypage/webtest/scenecase-instance")
    }


    return(
        <>
            <BackCommon
                clickBack={goBack}
                // right={<WebEnvSelect history={props.history}/>}
            />
            <div className={'testcase-detail'}>
                <div className="apidetail-header-btn">
                    <div className={"method-name"}>{allValue?.testCase?.name}</div>
                    <div className={'apidetail-title-tool'}>
                        <Button onClick={toHistory}>历史</Button>
                        <ExecuteTestDrawer
                            webSceneId={webSceneId}
                            webSceneStore={webSceneStore}
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

            <WebSceneStepList />

        </>
    )
}

export default inject('webSceneStore')(observer(WebSceneDetail));
