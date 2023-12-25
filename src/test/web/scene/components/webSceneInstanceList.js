import React from "react";
import {inject, observer} from "mobx-react";
import CaseBread from "../../../../common/CaseBread";
import InstanceListCommon from "../../../../testreport/common/InstanceListCommon";
import {CASE_TYPE} from "../../../../common/dictionary/dictionary";

const WebSceneInstanceList = (props) =>{
    const {webSceneStore} = props;
    const {testCaseInfo} = webSceneStore

    const webSceneId = sessionStorage.getItem("webSceneId")

    return(
        <div className={"content-box-center"}>
            <CaseBread
                breadItem={[testCaseInfo?.name,"历史"]}
                router={`/repository/web-scene/${webSceneId}`}
            />
            <InstanceListCommon belongId={webSceneId} type={CASE_TYPE.WEB}/>

        </div>
    )
}

export default inject('webSceneStore')(observer(WebSceneInstanceList));