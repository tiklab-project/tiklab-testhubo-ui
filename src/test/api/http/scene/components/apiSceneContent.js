import React,{useEffect} from 'react';
import {inject,observer } from 'mobx-react';
import {useParams} from "react-router";
import ApiSceneDetail from "./ApiSceneDetail";
import CaseBread from "../../../../../common/CaseBread";
import ApiEnvDropDownSelect from "../../../../../support/environment/components/apiEnvDropDownSelect";
import ApiExecuteTestPage from "./ApiExecuteTestPage";
import {Space} from "antd";
import ToggleCase from "../../../../testcase/components/ToggleCase";
import PageContent from "../../../../../common/pageContent/PageContent";


const ApiSceneContent = (props) => {
    const {apiSceneStore} = props;
    const {testCaseInfo,apiSceneInfo} = apiSceneStore

    let {caseId} = useParams()
    const apiSceneId = sessionStorage.getItem('apiSceneId') || caseId;

    useEffect(()=>{
        //获取路由id存入
        sessionStorage.setItem('apiSceneId',caseId);

    },[apiSceneId])

    return(
        <PageContent>
            <div className={"content-box-center"}>
                <CaseBread
                    breadItem={[testCaseInfo?.name]}
                    router={`/project/${sessionStorage.getItem("repositoryId")}/testcase`}
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
        </PageContent>
    )


}

export default inject('apiSceneStore')(observer(ApiSceneContent));
