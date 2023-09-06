import React, {useEffect, useState} from "react";
import {Button, Space} from "antd";
import ApiSceneStepList from "./apiSceneStepList";
import {inject, observer} from "mobx-react";
import {useHistory} from "react-router";
import IconBtn from "../../../../../common/iconBtn/IconBtn";
import {messageFn} from "../../../../../common/messageCommon/MessageCommon";
import ApiEnvDropDownSelect from "../../../../../support/environment/components/apiEnvDropDownSelect";

const ApiSceneDetail = (props) =>{
    const {apiSceneStore,apiEnvStore} = props;
    const {findApiScene} = apiSceneStore;
    const { envUrl } =apiEnvStore;

    const [caseInfo,setCaseInfo]=useState();

    let history = useHistory()
    const apiSceneId = sessionStorage.getItem('apiSceneId');
    useEffect(()=> {
        findApiScene(apiSceneId).then(res=>{
            setCaseInfo(res);
        })
    },[apiSceneId])
    
    const toExePage = () =>{
        if(envUrl){
            history.push("/repository/testcase/api-scene-execute")
        }else {
            messageFn("error","请选择环境")
        }
    }

    return(
        <div className={"content-box-center"}>
            <div className={"detail-box"}
                 style={{
                     padding:"20px 0",
                     display:"flex",
                     alignItems:"center",
                     justifyContent:"space-between"

                 }}
            >
                <div className={"detail-bottom"} style={{flex:"1"}}>
                    <span className={"detail-bottom-item "}>分组:{caseInfo?.testCase?.category?.name||"未设置"} </span>
                    <span className={"detail-bottom-item "}>更新者:{caseInfo?.testCase?.updateUser?.nickname||"未更新"}</span>
                    <span className={"detail-bottom-item "}>更新时间:{caseInfo?.testCase?.updateTime}</span>
                </div>
                <Space>
                    <IconBtn
                        className="pi-icon-btn-grey"
                        icon={"lishi"}
                        onClick={()=>history.push("/repository/testcase/api-scene-instance")}
                        name={"历史"}
                    />
                    <ApiEnvDropDownSelect />
                    <Button className={"important-btn"} onClick={toExePage}>
                        测试
                    </Button>
                </Space>
            </div>

            <ApiSceneStepList />
        </div>
    )
}

export default inject('apiSceneStore',"apiEnvStore")(observer(ApiSceneDetail))