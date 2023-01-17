
import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import WebSceneStepList from "./webSceneStepList";
import WebExecuteTestDrawer from "./webExecuteTestDrawer";
import DetailCommon from "../../../common/detailCommon";
import "../../webtest/webStyle.scss"

const WebSceneDetail = (props) => {
    const {webSceneStore} = props;
    const {findWebScene,updateWebScene} = webSceneStore;

    const [detailInfo,setDetailInfo]=useState();

    const webSceneId = sessionStorage.getItem('webSceneId');

    useEffect(()=> {
        findWebScene(webSceneId).then(res=>{
            setDetailInfo(res);
        })
    },[webSceneId])

    //更新名称
    const updateTitle = (value) =>{
        const param = {
            id:detailInfo.id,
            testCase: {
                ...detailInfo.testCase,
                name:value,
            }
        }
        updateWebScene(param)
    }


    const toHistory = () =>{
        props.history.push("/repositorypage/testcase/web-scenecase-instance")
    }


    return(
        <div className={"content-box-center"}>
            <DetailCommon
                detailInfo={detailInfo}
                updateTitle={updateTitle}
                toHistory={toHistory}
                test={
                    <WebExecuteTestDrawer
                        webSceneId={webSceneId}
                        webSceneStore={webSceneStore}
                    />
                }
            />
            <WebSceneStepList />
        </div>

    )
}

export default inject('webSceneStore')(observer(WebSceneDetail));
