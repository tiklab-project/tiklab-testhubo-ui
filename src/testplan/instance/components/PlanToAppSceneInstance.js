import React, {useEffect, useState} from "react";
import CaseBread from "../../../common/CaseBread";
import appSceneInstanceStore from "../../../test/app/scene/store/appSceneInstanceStore";
import AppSceneInstanceDetail from "../../../test/app/scene/components/AppSceneInstanceDetail";
import {observer} from "mobx-react";

const PlanToAppSceneInstance = () =>{
    const { findAppSceneInstance } = appSceneInstanceStore;

    const [spinning, setSpinning] = useState(true);
    const [appStepList, setAppStepList] = useState([]);
    const [instanceInfo, setInstanceInfo] = useState();
    const appSceneInstanceId = sessionStorage.getItem("appSceneInstanceId")

    useEffect(async ()=>{
        let res = await findAppSceneInstance(appSceneInstanceId)

        setInstanceInfo(res)
        setAppStepList(res.stepList)

        setSpinning(false);
    },[appSceneInstanceId])

    return(
        <>
            <CaseBread
                breadItem={["历史详情","WEB场景"]}
                router={"/repository/plan/instance"}
            />
            <AppSceneInstanceDetail
                spinning={spinning}
                appStepList={appStepList}
                instanceInfo={instanceInfo}
            />
        </>
    )
}

export default observer(PlanToAppSceneInstance)