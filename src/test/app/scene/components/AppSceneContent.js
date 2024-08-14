import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import {useHistory, useParams} from "react-router";
import AppSceneDetail from "./appSceneDetail";
import CaseBread from "../../../../common/CaseBread";
import IconBtn from "../../../../common/iconBtn/IconBtn";
import AppExecuteTestPage from "./AppExecuteTestPage";
import {Space} from "antd";
import ToggleCase from "../../../testcase/components/ToggleCase";
import AppEnvSelect from "../../../../support/environment/components/appEnvSelect";

const AppSceneContent = (props) =>{
    const {appSceneStore} = props;
    const {testCaseInfo,appSceneInfo} = appSceneStore
    let history = useHistory()
    let {id} = useParams()
    const appSceneId = sessionStorage.getItem('appSceneId') || id;

    useEffect(()=> {
        //获取路由id存入
        sessionStorage.setItem('appSceneId',id);

    },[appSceneId])

    return(
        <div className={"content-box-center"}>
            <CaseBread
                breadItem={[testCaseInfo?.name]}
                toggleCase={<ToggleCase  caseId={appSceneId}/>}
                style={{borderBottom:"none"}}
                router={`/project/${sessionStorage.getItem("repositoryId")}/testcase`}
                right={
                    <Space>
                        <AppEnvSelect />
                        <IconBtn
                            className="pi-icon-btn-grey"
                            icon={"lishi"}
                            onClick={()=>history.push("/project/app-scene-instance")}
                            name={"历史"}
                        />
                        <AppExecuteTestPage appSceneId={appSceneId} stepNum={appSceneInfo?.stepNum||0}/>
                    </Space>
                }
            />
            <AppSceneDetail appSceneId={appSceneId}/>
        </div>
    )
}

export default inject('appSceneStore')(observer(AppSceneContent));