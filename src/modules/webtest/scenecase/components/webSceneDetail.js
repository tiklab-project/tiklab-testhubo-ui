/**
 * @description：
 * @date: 2021-09-02 13:08
 */
import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import BackCommon from "../../../common/backCommon";
import WebSceneStepList from "./webSceneStepList";
import {Button} from "antd";
import WebEnvSelect from "../../webtest/webEnvSelect";

const WebSceneDetail = (props) => {
    const {webSceneStore} = props;
    const {findWebScene,updateWebScene} = webSceneStore;

    const [allValue,setAllValue] = useState();

    const webSceneId = sessionStorage.getItem('webSceneId');
    let caseType = localStorage.getItem("caseType")

    const [showResponse,setShowResponse] = useState(false);

    useEffect(()=> {
        findWebScene(webSceneId).then(res=>{
            setAllValue(res);
        })
    },[webSceneId])



    const goBack = () =>{
        props.history.push("/repositorypage/webtest/scenecase")
    }


    //执行测试
    const actionTest = () =>{
        //调接口

        setShowResponse(true)
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
                        <Button className="important-btn" onClick={actionTest}>测试</Button>
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
