import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import WebExecuteTestCommon from "./WebExecuteTestCommon";
import CaseBread from "../../../../common/CaseBread";

const WebExecuteTestPage = (props) =>{
    const {webSceneStore} = props;
    const {webSceneTestStatus} = webSceneStore;

    const webSceneId = sessionStorage.getItem('webSceneId')
    const [start, setStart] = useState()

    useEffect(()=>{
        let status = webSceneTestStatus(webSceneId);
        setStart(status)
    },[])

    const goBack = () =>{
        props.history.push(`/repository/testcase/web-scene/${webSceneId}`)
    }

    return(
        <div className={"content-box-center"}>
            <CaseBread title={"WEB场景测试"}/>
            <WebExecuteTestCommon
                start={start}
                setStart={setStart}
                webSceneId={webSceneId}
                {...props}
            />
        </div>

    )
}

export default inject('webSceneStore')(observer(WebExecuteTestPage))