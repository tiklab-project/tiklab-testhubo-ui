import React, {useEffect, useState} from "react";
import CaseBread from "../../../common/CaseBread";
import webSceneInstanceStore from "../../../test/web/scene/store/webSceneInstanceStore";
import WebSceneInstanceDetail from "../../../test/web/scene/components/WebSceneInstanceDetail";
import {observer} from "mobx-react";

const PlanToWebSceneInstance = () =>{
    const { findWebSceneInstance } = webSceneInstanceStore;

    const [spinning, setSpinning] = useState(true);
    const [webStepList, setWebStepList] = useState([]);
    const [instanceInfo, setInstanceInfo] = useState();
    const webSceneInstanceId = sessionStorage.getItem("webSceneInstanceId")

    useEffect(async ()=>{
        let res = await findWebSceneInstance(webSceneInstanceId)

        setInstanceInfo(res)
        setWebStepList(res.stepList)

        setSpinning(false);
    },[webSceneInstanceId])

    return(
        <>
            <CaseBread
                breadItem={["历史详情","WEB场景"]}
                router={"/project/plan/instance"}
            />
            <WebSceneInstanceDetail
                spinning={spinning}
                webStepList={webStepList}
                instanceInfo={instanceInfo}
            />
        </>
    )
}

export default observer(PlanToWebSceneInstance)