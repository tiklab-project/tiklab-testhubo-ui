import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import WebExecuteTestCommon from "./WebExecuteTestCommon";
import {DrawerCloseIcon} from "../../../common/BreadcrumbCommon";
import {ArrowLeftOutlined} from "@ant-design/icons";

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
            <div
                className={"breadcrumb-title_between"}
                style={{height:"36px"}}
            >
                <ArrowLeftOutlined onClick={goBack} style={{cursor:"pointer"}}/>

                <DrawerCloseIcon />
            </div>
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