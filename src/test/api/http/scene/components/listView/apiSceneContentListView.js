import React from 'react';
import {inject,observer } from 'mobx-react';
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
                    <div className={"display-flex-between header-right-box"}>
                        <ApiEnvDropDownSelect />
                        <ApiExecuteTestPage apiSceneId={apiSceneId} stepNum={apiSceneInfo?.stepNum||0}/>
                    </div>
                }
            />
            <ApiSceneDetail apiSceneId={apiSceneId}/>
        </div>
    )
}

export default inject('apiSceneStore')(observer(ApiSceneContentListView));
