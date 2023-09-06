import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import AppExecuteTestCommon from "./AppExecuteTestCommon";
import {DrawerCloseIcon} from "../../../common/BreadcrumbCommon";
import {ArrowLeftOutlined} from "@ant-design/icons";

const AppExecuteTestPage = (props) =>{
    const {appSceneStore} = props;
    const {appSceneTestStatus} = appSceneStore;

    const appSceneId = sessionStorage.getItem('appSceneId')
    const [start, setStart] = useState()

    useEffect(()=>{
        let status = appSceneTestStatus(appSceneId);
        setStart(status)
    },[])

    const goBack = () =>{
        props.history.push(`/repository/testcase/app-scene/${appSceneId}`)
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