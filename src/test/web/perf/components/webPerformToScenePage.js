import React, {useEffect, useState} from "react";
import {Breadcrumb} from "antd";
import {inject, observer} from "mobx-react";

import WebSceneStepList from "../../scene/components/WebSceneStepList";
import DetailCommon from "../../../../common/DetailCommon";
import {useHistory} from "react-router";
import {DrawerCloseIcon} from "../../../common/BreadcrumbCommon";

const WebPerformToScenePage = (props) =>{
    const {webPerfStore,webSceneStore} = props;
    const {findWebScene,updateWebScene} = webSceneStore;
    const {findWebPerf} = webPerfStore;

    const history = useHistory();
    const [webScene, setWebScene] = useState();
    const [webPerfName, setWebPerfName] = useState();
    const webSceneId = sessionStorage.getItem('webSceneId');
    const webPerfId = sessionStorage.getItem('webPerfId');


    useEffect(()=>{
        findWebScene(webSceneId).then(res=>{
            setWebScene(res);
        })
    },[webSceneId])

    useEffect(async ()=>{
        let res = await findWebPerf(webPerfId)
        setWebPerfName(res.testCase.name);

    },[webPerfId])


    //更新名称
    const updateTitle = (value) =>{
        const param = {
            id:setWebScene.id,
            testCase: {
                ...setWebScene.testCase,
                name:value,
            }
        }
        updateWebScene(param).then(()=>{
            findWebScene(webSceneId).then(res=>{
                setWebScene(res);
            })
        })
    }

    const toWebScene = () =>{
        history.push(`/repository/web-scene/${webSceneId}`)
    }


    return(
        <div className={"content-box-center"}>
            <div className={"breadcrumb-title_between"}>
                <Breadcrumb className={"breadcrumb-box"}>
                    <Breadcrumb.Item onClick={toWebScene} className={"first-item"}>用例详情</Breadcrumb.Item>
                    <Breadcrumb.Item >步骤详情</Breadcrumb.Item>
                </Breadcrumb>
                <DrawerCloseIcon />
            </div>
            <DetailCommon
                detailInfo={webScene}
                updateCase={updateCase}
            />

            <WebSceneStepList {...props}/>
        </div>
    )
}

export default inject("webSceneStore","webPerfStore")(observer(WebPerformToScenePage));