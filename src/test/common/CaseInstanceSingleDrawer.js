import React, {useEffect, useState} from "react";
import {Drawer} from "antd";
import {CASE_TYPE} from "./DefineVariables";
import {useHistory, useLocation} from "react-router";
import {renderRoutes} from "react-router-config";


const CaseInstanceSingleDrawer = (props) =>{
    const {caseData} = props
    
    const history = useHistory();
    const [open, setOpen] = useState(false);
    let pathname = useLocation().pathname;

    useEffect(()=>{
        if(open&&pathname==="/repository/testcase"){
            setOpen(false)
        }
    },[pathname,open])


    const showDrawer = async () => {
        switchInstance(caseData)
        setOpen(true);
    };

    //再根据不同的用例类型跳到不同的页面
    const switchInstance = (record)=>{
        let recentInstance = record.recentInstance
        let caseType = record.caseType

        switch (caseType) {
            case CASE_TYPE.API_UNIT:
                toCaseDetail("apiUnitInstanceId",recentInstance,caseType)
                break;
            case CASE_TYPE.API_SCENE:
                toCaseDetail("apiSceneInstanceId",recentInstance,caseType)
                break;
            case CASE_TYPE.API_PERFORM:
                toCaseDetail("apiPerfInstanceId",recentInstance,caseType)
                break;
            case CASE_TYPE.WEB_SCENE:
                toCaseDetail("webSceneInstanceId",recentInstance,caseType)
                break;
            case CASE_TYPE.WEB_PERFORM:
                toCaseDetail("webPerfInstanceId",recentInstance,caseType)
                break;
            case CASE_TYPE.APP_SCENE:
                toCaseDetail("appSceneInstanceId",recentInstance,caseType)
                break;
            case CASE_TYPE.APP_PERFORM:
                toCaseDetail("appPerfInstanceId",recentInstance,caseType)
                break;
        }
    }

    //跳转路由
    const toCaseDetail = (setId,recentInstance,caseType)=>{
        sessionStorage.setItem(setId,recentInstance.instanceId);
        history.push(`/repository/testcase/${caseType}-instance-single`)
    }

    const onClose = () => {
        history.push("/repository/testcase")
        setOpen(false);
    };

    /**
     * 展示实例名称
     */
    const showRecent=(instanceData)=>{
        let recentInstance = instanceData.recentInstance
        switch (recentInstance.result) {
            case 0:
                return <span>失败 #{recentInstance.executeNumber}</span>
            case 1:
                return <span>成功 #{recentInstance.executeNumber}</span>
        }
    }


    return(
        <>
            <a onClick={showDrawer}>
                {caseData?.recentInstance?.result===2?<span>--</span>:showRecent(caseData)}
            </a>
            <Drawer
                placement="right"
                onClose={onClose}
                open={open}
                width={"70%"}
                destroyOnClose={true}
                maskStyle={{background:"transparent"}}
                contentWrapperStyle={{top:48,height:"calc(100% - 48px)"}}
                closable={false}
            >
                {
                    renderRoutes(props?.route?.routes)
                }
            </Drawer>
        </>
    )
}


export default CaseInstanceSingleDrawer;