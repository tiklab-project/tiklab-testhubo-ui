import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import AppExecuteTestCommon from "./AppExecuteTestCommon";
import {Breadcrumb} from "antd";
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
            <div className={"breadcrumb-title_between"}>
                <Breadcrumb className={"breadcrumb-box"}>
                    <Breadcrumb.Item onClick={goBack} className={"first-item"}>用例详情</Breadcrumb.Item>
                    <Breadcrumb.Item >测试</Breadcrumb.Item>
                </Breadcrumb>
                {/*<ArrowLeftOutlined onClick={goBack}/>*/}
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