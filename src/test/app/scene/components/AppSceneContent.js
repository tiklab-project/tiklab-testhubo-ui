import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import { useParams} from "react-router";
import AppSceneDetail from "./appSceneDetail";
import CaseBread from "../../../../common/CaseBread";

const AppSceneContent = (props) =>{
    const {appSceneStore} = props;
    const {testCaseInfo} = appSceneStore

    let {id} = useParams()
    const appSceneId = sessionStorage.getItem('appSceneId') || id;

    useEffect(()=> {
        //获取路由id存入
        sessionStorage.setItem('appSceneId',id);

    },[appSceneId])

    return(
        <>
            <CaseBread
                icon={"shouji"}
                title={testCaseInfo?.name}
                caseType={testCaseInfo?.caseType}
                style={{
                    borderBottom:"none"
                }}
            />
            <AppSceneDetail/>
        </>
    )
}

export default inject('appSceneStore')(observer(AppSceneContent));