import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import WebExecuteTestCommon from "./WebExecuteTestCommon";
import {Breadcrumb} from "antd";
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
            <div className={"breadcrumb-title_between"}>
                <Breadcrumb className={"breadcrumb-box"}>
                    <Breadcrumb.Item onClick={goBack} className={"first-item"}>用例详情</Breadcrumb.Item>
                    <Breadcrumb.Item >测试</Breadcrumb.Item>
                </Breadcrumb>
                {/*<ArrowLeftOutlined onClick={goBack}/>*/}
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