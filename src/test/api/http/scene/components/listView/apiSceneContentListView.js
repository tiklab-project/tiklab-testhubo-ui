import React,{useEffect} from 'react';
import {inject,observer } from 'mobx-react';
import {useParams} from "react-router";
import {Space} from "antd";
import CaseBread from "../../../../../../common/CaseBread";
import ApiEnvDropDownSelect from "../../../../../../support/environment/components/apiEnvDropDownSelect";
import ApiExecuteTestPage from "../ApiExecuteTestPage";
import ApiSceneDetail from "../ApiSceneDetail";


const ApiSceneContentListView = (props) => {
    const {apiSceneStore} = props;
    const {testCaseInfo,apiSceneInfo} = apiSceneStore
    const apiSceneId = sessionStorage.getItem('apiSceneId') ;

    return(
        <div className={"content-box-center"}>
            <CaseBread
                icon={"api1"}
                breadItem={[testCaseInfo?.name]}
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

export default inject('apiSceneStore')(observer(ApiSceneContentListView));
