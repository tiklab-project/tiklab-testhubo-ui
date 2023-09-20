import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import ApiPerfExecuteTestCommon from "./ApiPerfExecuteTestCommon";
import CaseBread from "../../../../../common/CaseBread";

const ApiPerfExecuteTestPage = (props) =>{
    const {apiPerfStore} = props;
    // const {apiPerfTestStatus} = apiPerfStore;

    const apiPerfId = sessionStorage.getItem('apiPerfId')
    const [start, setStart] = useState()

    useEffect(()=>{
        // let status = apiPerfTestStatus(apiPerfId);
        setStart(1)
    },[])



    return(
        <div className={"content-box-center"}>
            <CaseBread title={"接口性能测试"}/>
            <ApiPerfExecuteTestCommon
                start={start}
                setStart={setStart}
                apiPerfId={apiPerfId}
                {...props}
            />
        </div>

    )
}

export default inject('apiPerfStore')(observer(ApiPerfExecuteTestPage))