import React from "react";
import {CASE_TYPE} from "./DefineVariables";
import ApiUnitInstanceSinglePage from "../api/http/unit/components/apiUnitInstanceSinglePage";
import ApiSceneInstanceSinglePage from "../api/http/scene/components/apiSceneInstanceSinglePage";
import ApiPerfInstanceSinglePage from "../api/http/perf/components/ApiPerfInstanceSinglePage";
import WebSceneInstanceSinglePage from "../web/scene/components/WebSceneInstanceSinglePage";
import AppSceneInstanceSinglePage from "../app/scene/components/AppSceneInstanceSinglePage";


const CaseInstanceSingleDrawer = (props) =>{
    const {caseData} = props

    //再根据不同的用例类型跳到不同的页面
    const switchInstance = (record)=>{
        let recentInstance = record.recentInstance
        let caseType = record.caseType

        if( recentInstance?.result===2){
            return <span>--</span>
        }

        switch (caseType) {
            case CASE_TYPE.API_UNIT:
                return  <ApiUnitInstanceSinglePage
                            apiUnitInstanceId={recentInstance.instanceId}
                            name={showRecent(recentInstance)}
                        />
            case CASE_TYPE.API_SCENE:

                return <ApiSceneInstanceSinglePage
                        apiSceneInstanceId={recentInstance.instanceId}
                        name={showRecent(recentInstance)}
                    />
            case CASE_TYPE.API_PERFORM:
                return <ApiPerfInstanceSinglePage
                        apiPerfInstanceId={recentInstance.instanceId}
                        name={showRecent(recentInstance)}
                    />
            case CASE_TYPE.WEB_SCENE:
                return <WebSceneInstanceSinglePage
                    webSceneInstanceId={recentInstance.instanceId}
                    name={showRecent(recentInstance)}
                />
            // case CASE_TYPE.WEB_PERFORM:
            //     toCaseDetail("webPerfInstanceId",recentInstance,caseType)
            //     break;
            case CASE_TYPE.APP_SCENE:
                return   <AppSceneInstanceSinglePage
                    appSceneInstanceId={recentInstance.instanceId}
                    name={showRecent(recentInstance)}
                />
            // case CASE_TYPE.APP_PERFORM:
            //     toCaseDetail("appPerfInstanceId",recentInstance,caseType)
            //     break;
        }
    }

    /**
     * 展示实例名称
     */
    const showRecent=(recentInstance)=>{
        switch (recentInstance.result) {
            case 0:
                return <>失败 #{recentInstance.executeNumber}</>
            case 1:
                return <>成功 #{recentInstance.executeNumber}</>
        }
    }

    return(
        <>
            {
                switchInstance(caseData)
            }
        </>
    )
}


export default CaseInstanceSingleDrawer;