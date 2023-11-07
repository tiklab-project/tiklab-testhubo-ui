import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {useHistory, useParams} from "react-router";
import WebSceneDetail from "./webSceneDetail";
import CaseBread from "../../../../common/CaseBread";
import IconBtn from "../../../../common/iconBtn/IconBtn";
import WebExecuteTestPage from "./WebExecuteTestPage";
import {Space} from "antd";


const WebSceneContent = (props) =>{
    const {webSceneStore} = props;
    const {testCaseInfo} = webSceneStore
    let history = useHistory()
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
               right={
                   <Space>
                       <IconBtn
                           className="pi-icon-btn-grey"
                           icon={"lishi"}
                           onClick={()=>history.push("/repository/web-scene-instance")}
                           name={"历史"}
                       />
                       <WebExecuteTestPage webSceneId={webSceneId} />
                   </Space>
               }
           />
           <WebSceneDetail/>
        </div>
    )
}

export default inject('webSceneStore')(observer(WebSceneContent));