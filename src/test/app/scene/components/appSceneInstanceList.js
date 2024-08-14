import React from "react";
import {inject, observer} from "mobx-react";
import CaseBread from "../../../../common/CaseBread";
import InstanceListCommon from "../../../../testreport/common/InstanceListCommon";
import {CASE_TYPE} from "../../../../common/dictionary/dictionary";

const AppSceneInstanceList = (props) =>{
    const {appSceneStore} = props;
    const {testCaseInfo} = appSceneStore

    const appSceneId = sessionStorage.getItem("appSceneId")

    return(
        <div className={"content-box-center"}>
            <CaseBread
                breadItem={[testCaseInfo?.name,"历史"]}
                router={`/project/app-scene/${appSceneId}`}
            />
            <InstanceListCommon belongId={appSceneId} type={CASE_TYPE.APP_SCENE}/>

        </div>
    )
}

export default inject('appSceneStore')(observer(AppSceneInstanceList));