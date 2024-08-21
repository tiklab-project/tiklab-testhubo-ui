import React,{useEffect} from 'react';
import {inject,observer } from 'mobx-react';
import {useParams} from "react-router";
import ApiSceneDetail from "./ApiSceneDetail";
import CaseBread from "../../../../../common/CaseBread";
import ApiEnvDropDownSelect from "../../../../../support/environment/components/apiEnvDropDownSelect";
import ApiExecuteTestPage from "./ApiExecuteTestPage";
import ToggleCase from "../../../../testcase/components/ToggleCase";
import PageCenter from "../../../../../common/pageContent/PageCenter";


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
        <PageCenter>
            <div className={"content-box-center"}>
                <CaseBread
                    breadItem={[testCaseInfo?.name]}
                    router={`/project/${sessionStorage.getItem("repositoryId")}/testcase`}
                    style={{borderBottom:"none"}}
                    toggleCase={<ToggleCase  caseId={apiSceneId}/>}
                    right={
                        <div className={"display-flex-between header-right-box"}>
                            <ApiEnvDropDownSelect />
                            <ApiExecuteTestPage apiSceneId={apiSceneId} stepNum={apiSceneInfo?.stepNum||0}/>
                        </div>
                    }
                />
                <ApiSceneDetail apiSceneId={apiSceneId}/>
            </div>
        </PageCenter>
    )


}

export default inject('apiSceneStore')(observer(ApiSceneContent));
