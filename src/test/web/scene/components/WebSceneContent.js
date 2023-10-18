import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {useParams} from "react-router";
import WebSceneDetail from "./webSceneDetail";
import CaseBread from "../../../../common/CaseBread";

const WebSceneContent = (props) =>{
    const {webSceneStore} = props;
    const {testCaseInfo} = webSceneStore

    let {id} = useParams()
    const webSceneId = sessionStorage.getItem('webSceneId') || id;

    useEffect(()=> {
        //获取路由id存入
        sessionStorage.setItem('webSceneId',id);

    },[webSceneId])

    return(
        <div className={"content-box-center"}>
           <CaseBread
               title={testCaseInfo?.name}
               caseType={testCaseInfo?.caseType}
               style={{borderBottom:"none"}}
               breadItem={["用例详情"]}
           />
           <WebSceneDetail/>
        </div>
    )
}

export default inject('webSceneStore')(observer(WebSceneContent));