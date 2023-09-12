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
       <>
           <CaseBread
               icon={"diannao"}
               title={testCaseInfo?.name}
               caseType={testCaseInfo?.caseType}
               style={{
                   borderBottom:"none"
               }}
           />
           <WebSceneDetail/>
       </>
    )
}

export default inject('webSceneStore')(observer(WebSceneContent));