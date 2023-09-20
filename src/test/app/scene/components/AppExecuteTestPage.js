import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import AppExecuteTestCommon from "./AppExecuteTestCommon";
import CaseBread from "../../../../common/CaseBread";

const AppExecuteTestPage = (props) =>{
    const {appSceneStore} = props;
    const {appSceneTestStatus} = appSceneStore;

    const appSceneId = sessionStorage.getItem('appSceneId')
    const [start, setStart] = useState()

    useEffect(()=>{
        let status = appSceneTestStatus(appSceneId);
        setStart(status)
    },[])

    return(
        <div className={"content-box-center"}>
            <CaseBread title={"APP场景测试"}/>
            <AppExecuteTestCommon
                start={start}
                setStart={setStart}
                appSceneId={appSceneId}
                {...props}
            />
        </div>

    )
}

export default inject('appSceneStore')(observer(AppExecuteTestPage))