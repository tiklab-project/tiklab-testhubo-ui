import React,{useEffect} from 'react';
import { inject,observer } from 'mobx-react';
import {useHistory, useParams} from "react-router";
import ApiSceneDetail from "./ApiSceneDetail";
import CaseBread from "../../../../../common/CaseBread";
import ApiEnvDropDownSelect from "../../../../../support/environment/components/apiEnvDropDownSelect";
import ApiExecuteTestPage from "./ApiExecuteTestPage";
import {Space} from "antd";
import ToggleCase from "../../../../testcase/components/ToggleCase";


const ApiSceneContent = (props) => {
    const {apiSceneStore} = props;
    const {testCaseInfo,apiSceneInfo} = apiSceneStore

    let {id} = useParams()
    const apiSceneId = sessionStorage.getItem('apiSceneId') || id;

    useEffect(()=>{
        //获取路由id存入
        sessionStorage.setItem('apiSceneId',id);

    },[apiSceneId])

    return(
        <div className={"content-box-center"}>
            <CaseBread
                breadItem={[testCaseInfo?.name]}
                router={`/repository/testcase/${sessionStorage.getItem("repositoryId")}`}
                style={{borderBottom:"none"}}
                toggleCase={<ToggleCase  caseId={apiSceneId}/>}
                right={
                    <Space>
                        <ApiEnvDropDownSelect />
                        <ApiExecuteTestPage apiSceneId={apiSceneId} stepNum={apiSceneInfo?.stepNum||0}/>
                    </Space>
                }
            />
            <ApiSceneDetail apiSceneId={apiSceneId}/>
        </div>
    )


}

export default inject('apiSceneStore')(observer(ApiSceneContent));
