import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {DrawerCloseIcon} from "../../../../common/BreadcrumbCommon";
import ApiPerfExecuteTestCommon from "./ApiPerfExecuteTestCommon";

const ApiPerfExecuteTestPage = (props) =>{
    const {apiPerfStore} = props;
    // const {apiPerfTestStatus} = apiPerfStore;

    const apiPerfId = sessionStorage.getItem('apiPerfId')
    const [start, setStart] = useState()

    useEffect(()=>{
        // let status = apiPerfTestStatus(apiPerfId);
        setStart(1)
    },[])

    const goBack = () =>{
        props.history.push(`/repository/testcase/api-perform/${apiPerfId}`)
    }

    return(
        <div className={"content-box-center"}>
            <div
                className={"breadcrumb-title_between"}
                style={{height:"36px"}}
            >
                <ArrowLeftOutlined onClick={goBack} style={{cursor:"pointer"}}/>

                <DrawerCloseIcon />
            </div>
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