import React from "react";
import {CASE_TYPE} from "./DefineVariables";
import LazyComponent from "../../common/Lazy";
import {CheckCircleTwoTone, CloseCircleTwoTone} from "@ant-design/icons";

let ApiUnitInstanceSinglePage = LazyComponent(() => import("../api/http/unit/components/apiUnitInstanceSinglePage"));
let ApiSceneInstanceSinglePage = LazyComponent(() => import("../api/http/scene/components/apiSceneInstanceSinglePage"));
let ApiPerfInstanceSinglePage = LazyComponent(() => import("../api/http/perf/components/ApiPerfInstanceSinglePage"));
let WebSceneInstanceSinglePage = LazyComponent(() => import("../web/scene/components/WebSceneInstanceSinglePage"));
let AppSceneInstanceSinglePage = LazyComponent(() => import("../app/scene/components/AppSceneInstanceSinglePage"));


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
                return <><CloseCircleTwoTone twoToneColor={"red"}/> #{recentInstance.executeNumber}</>
            case 1:
                return <><CheckCircleTwoTone twoToneColor={"#52c41a"}/> #{recentInstance.executeNumber}</>
            default:
                return <><CheckCircleTwoTone /> #{recentInstance.executeNumber}</>
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