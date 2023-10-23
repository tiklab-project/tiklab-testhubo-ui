import React,{useEffect,useState} from 'react';
import { inject,observer } from 'mobx-react';
import {useHistory, useParams} from "react-router";
import ApiPerformDetail from "./apiPerformDetail";
import CaseBread from "../../../../../common/CaseBread";
import ApiEnvDropDownSelect from "../../../../../support/environment/components/apiEnvDropDownSelect";
import IconBtn from "../../../../../common/iconBtn/IconBtn";
import ApiPerfExecuteTestPage from "./ApiPerfExecuteTestPage";
import {Space} from "antd";

const ApiPerfContent = (props) => {
    const {apiPerfStore} = props;
    const {testCaseInfo} = apiPerfStore

    let history = useHistory()
    let {id} = useParams()
    const apiPerfId = sessionStorage.getItem('apiPerfId') || id;

    useEffect(()=>{
        //获取路由id存入
        sessionStorage.setItem('apiPerfId',id);
    },[apiPerfId])


    return(
        <div className={"content-box-center"}>
            <CaseBread
                style={{borderBottom:"none"}}
                title={testCaseInfo?.name}
                caseType={testCaseInfo?.caseType}
                breadItem={["用例详情"]}
                right={
                    <Space>
                        <ApiEnvDropDownSelect />
                        <IconBtn
                            className="pi-icon-btn-grey"
                            icon={"lishi"}
                            onClick={()=>history.push("/repository/api-perform-instance")}
                            name={"历史"}
                        />
                        <ApiPerfExecuteTestPage apiPerfId={apiPerfId}/>
                    </Space>
                }
            />
            <ApiPerformDetail/>
        </div>
    )
}

export default inject('apiPerfStore')(observer(ApiPerfContent));
