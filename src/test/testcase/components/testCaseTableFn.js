import React from "react";
import {CASE_TYPE, caseTypeToRouter} from "../../../common/dictionary/dictionary";
import {getUser} from "tiklab-core-ui";
import {getVersionInfo} from "tiklab-core-ui";
import {useHistory} from "react-router";
import ApiUnitExecuteTest from "../../api/http/unit/components/apiUnitExecuteTest";
import ApiExecuteTestPage from "../../api/http/scene/components/ApiExecuteTestPage";
import ApiPerfExecuteTestPage from "../../api/http/perf/components/ApiPerfExecuteTestPage";
import ExtensionCommon from "../../../common/ExtensionCommon";
import {CaretRightOutlined, UserOutlined} from "@ant-design/icons";
import HideDelete from "../../../common/hideDelete/HideDelete";
import IconCommon from "../../../common/IconCommon";
import {Avatar, Space} from "antd";


//再根据不同的用例类型跳到不同的页面
export const switchCaseTypeFn = (record,history)=>{
    const repositoryId = sessionStorage.getItem("repositoryId")

    //跳转路由
    const toCaseDetail = (setId,record,history)=>{
        sessionStorage.setItem(`${setId}`,record.id);
        history.push(`/project/${repositoryId}/testcaseList/${caseTypeToRouter[record.caseType]}/${record.id}`)
    }

    switch (record.caseType) {
        case CASE_TYPE.FUNCTION:
            toCaseDetail("functionId",record,history)
            break;
        case CASE_TYPE.API_UNIT:
            toCaseDetail("apiUnitId",record,history)
            break;
        case CASE_TYPE.API_SCENE:
            toCaseDetail("apiSceneId",record,history)
            break;
        case CASE_TYPE.API_PERFORM:
            toCaseDetail("apiPerfId",record,history)
            break;

        case CASE_TYPE.WEB_SCENE:
            toCaseDetail("webSceneId",record,history)
            break;
        case CASE_TYPE.APP_SCENE:
            toCaseDetail("appSceneId",record,history)
            break;

    }
}




export const SwitchCaseTypeView = ({record,testCaseRecent,repositoryId}) =>{
    let history = useHistory();

    const switchCaseTypeView = (record) =>{
        switch (record.caseType) {
            case CASE_TYPE.FUNCTION:
            case CASE_TYPE.API_UNIT:
            case CASE_TYPE.API_SCENE:
            case CASE_TYPE.API_PERFORM:
                return <span className={"link-text"}  onClick={()=>switchCaseType(record)}>{record.name}</span>
            case CASE_TYPE.WEB_SCENE:
            case CASE_TYPE.APP_SCENE:
                if(getVersionInfo().expired===false){
                    return <span className={"link-text"}  onClick={()=>switchCaseType(record)}>{record.name}</span>
                }else {
                    return <ExtensionCommon name={record.name} />
                }
            default:
                return null
        }
    }

    //再根据不同的用例类型跳到不同的页面
    const switchCaseType = (record)=>{
        switch (record.caseType) {
            case CASE_TYPE.FUNCTION:
                toCaseDetail("functionId",record)
                break;
            case CASE_TYPE.API_UNIT:
                toCaseDetail("apiUnitId",record)
                break;
            case CASE_TYPE.API_SCENE:
                toCaseDetail("apiSceneId",record)
                break;
            case CASE_TYPE.API_PERFORM:
                toCaseDetail("apiPerfId",record)
                break;

            case CASE_TYPE.WEB_SCENE:
                toCaseDetail("webSceneId",record)
                break;
            case CASE_TYPE.APP_SCENE:
                toCaseDetail("appSceneId",record)
                break;

        }
    }

    //跳转路由
    const toCaseDetail = (setId,record)=>{
        sessionStorage.setItem(`${setId}`,record.id);
        history.push(`/project/${repositoryId}/testcase/${caseTypeToRouter[record.caseType]}/${record.id}`)

        //最近访问
        let params = {
            repository:{id:repositoryId},
            user:{id:getUser().userId},
            testCase:{id:record.id},
        }
        testCaseRecent(params)
    }

    return(
        <>
            {switchCaseTypeView(record)}
        </>
    )
}




/**
 * 快捷测试按钮
 * @param record
 */
export const ShowQuickExe = (props)=>{
    const {record,WebExecuteTestPage,AppExecuteTestPage} = props

    const switchExe = ()=>{
        switch (record.caseType) {
            case CASE_TYPE.API_UNIT:
                return <ApiUnitExecuteTest type={"quick"} apiUnitId={record.id}/>
            case CASE_TYPE.API_SCENE:
                return <ApiExecuteTestPage type={"quick"} apiSceneId={record.id} />
            case CASE_TYPE.API_PERFORM:
                return <ApiPerfExecuteTestPage type={"quick"} apiPerfId={record.id} />
            case CASE_TYPE.WEB_SCENE:
                return <ExtensionCommon
                    extension={WebExecuteTestPage&&<WebExecuteTestPage type={"quick"} webSceneId={record.id}/>}
                    icon={ <IconCommon
                        icon={"bofang"}
                        className={"icon-m edit-icon"}
                    />}
                />
            case CASE_TYPE.APP_SCENE:
                return<ExtensionCommon
                    extension={AppExecuteTestPage&&<AppExecuteTestPage type={"quick"} appSceneId={record.id}/>}
                    icon={<IconCommon
                        icon={"bofang"}
                        className={"icon-m edit-icon"}
                    />}
                />
            default:
                return null;
        }
    }


    return (
        <>
            {switchExe()}
        </>
    )
}

export  const ShowDeleteView = ({record,deleteFn}) =>{
    switch (record.caseType||record.type) {
        case CASE_TYPE.FUNCTION:
        case CASE_TYPE.API_UNIT:
        case CASE_TYPE.API_SCENE:
        case CASE_TYPE.API_PERFORM:
        case CASE_TYPE.TEST_PLAN:
            return  <HideDelete deleteFn={() =>deleteFn(record)}/>
        case CASE_TYPE.WEB_SCENE:
        case CASE_TYPE.APP_SCENE:
            if( getVersionInfo().expired===false){
                return <HideDelete deleteFn={() =>deleteFn(record)}/>
            }else {
                return <ExtensionCommon  icon={<IconCommon icon={"gengduo"} className={"icon-m edit-icon"}/>} />
            }
        default:
            return null
    }
}

export const rowStyle = (caseType,style)=>{
    if(getVersionInfo().expired===true){
        if(caseType===CASE_TYPE.WEB_SCENE||caseType===CASE_TYPE.APP_SCENE){
            return {...style}
        }else {
            return {}
        }
    }
}

export const showCreateUser = (director) =>{
    if(director&&director.nickname){
        return <div className={"ws-user-item"}>
            <Space>
                <Avatar style={{width:"24px",height:"24px",lineHeight:"24px",verticalAlign: 'middle',}}>{director?.nickname[0]}</Avatar>
                <span className={"text-ellipsis"}>{director?.nickname} </span>
            </Space>
        </div>
    }else {
        return <div className={"ws-user-item"}>
            <div className={"display-flex-gap"}>
                <Avatar  style={{flex:"none"}} size="small" icon={<UserOutlined />} />
                <span> 未设置 </span>
            </div>
        </div>
    }
}
