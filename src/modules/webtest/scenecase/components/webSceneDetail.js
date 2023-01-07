
import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import BackCommon from "../../../common/backCommon";
import WebSceneStepList from "./webSceneStepList";
import ExecuteTestDrawer from "./executeTestDrawer";
import DetailCommon from "../../../common/detailCommon";

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


    const goBack = () =>{
        props.history.push("/repositorypage/testcase/list")
    }

    const toHistory = () =>{
        props.history.push("/repositorypage/testcase/scenecase-instance")
    }


    return(
        <>
            {/*<BackCommon clickBack={goBack}/>*/}
            <div className={"content-box-center"}>
                <DetailCommon
                    detailInfo={detailInfo}
                    updateTitle={updateTitle}
                    toHistory={toHistory}
                    test={
                        <ExecuteTestDrawer
                            webSceneId={webSceneId}
                            webSceneStore={webSceneStore}
                        />
                    }
                />
                <WebSceneStepList />
            </div>
        </>
    )
}

export default inject('webSceneStore')(observer(WebSceneDetail));
