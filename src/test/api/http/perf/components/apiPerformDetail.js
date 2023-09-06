import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import ApiPerformDetailCommon from "./apiPerformDetailCommon";
import IconBtn from "../../../../../common/iconBtn/IconBtn";
import ApiEnvDropDownSelect from "../../../../../support/environment/components/apiEnvDropDownSelect";
import {useHistory} from "react-router";
import {Button, Space} from "antd";
import {messageFn} from "../../../../../common/messageCommon/MessageCommon";


const ApiPerformDetail = (props) =>{
    const {apiPerfStore,apiEnvStore} = props;
    const {findApiPerf} = apiPerfStore;
    const { envUrl } =apiEnvStore;

    const [caseInfo,setCaseInfo]=useState();

    const history = useHistory();
    const apiPerfId = sessionStorage.getItem("apiPerfId");
    useEffect(()=>{
        findApiPerf(apiPerfId).then(res=>{
            setCaseInfo(res);
        })
    },[apiPerfId])

    const toExePage = () =>{
        if(envUrl){
            history.push("/repository/testcase/api-perform-execute")
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
                        onClick={()=>history.push("/repository/testcase/api-perform-instance")}
                        name={"历史"}
                    />
                    <ApiEnvDropDownSelect />
                    <Button className={"important-btn"} onClick={toExePage}>
                        测试
                    </Button>
                </Space>
            </div>

            <ApiPerformDetailCommon type={true} {...props} />
        </div>
    )
}

export default inject("apiPerfStore","apiEnvStore")(observer(ApiPerformDetail));