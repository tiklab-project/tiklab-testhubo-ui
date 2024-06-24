import React,{useEffect} from 'react';
import {inject,observer } from 'mobx-react';
import {useParams} from "react-router";
import ApiPerformDetail from "./apiPerformDetail";
import CaseBread from "../../../../../common/CaseBread";
import ApiEnvDropDownSelect from "../../../../../support/environment/components/apiEnvDropDownSelect";
import ApiPerfExecuteTestPage from "./ApiPerfExecuteTestPage";
import {Space} from "antd";
import ToggleCase from "../../../../testcase/components/ToggleCase";


const ApiPerfContent = (props) => {
    const {apiPerfStore} = props;
    const {testCaseInfo} = apiPerfStore

    let {id} = useParams()
    const apiPerfId = sessionStorage.getItem('apiPerfId') || id;

    useEffect(()=>{
        //获取路由id存入
        sessionStorage.setItem('apiPerfId',id);
    },[apiPerfId])


    return(
        <div className={"content-box-center"}>
            <CaseBread
                router={`/repository/testcase/${sessionStorage.getItem("repositoryId")}`}
                style={{borderBottom:"none"}}
                breadItem={[testCaseInfo?.name]}
                toggleCase={<ToggleCase  caseId={apiPerfId}/>}
                right={
                    <Space>
                        <ApiEnvDropDownSelect />
                        <ApiPerfExecuteTestPage apiPerfId={apiPerfId}/>
                    </Space>
                }
            />
            <ApiPerformDetail apiPerfId={apiPerfId}/>
        </div>
    )
}

export default inject('apiPerfStore')(observer(ApiPerfContent));
