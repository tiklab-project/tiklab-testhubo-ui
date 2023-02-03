
import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import WebSceneStepList from "./webSceneStepList";
import WebExecuteTestDrawer from "./webExecuteTestDrawer";
import DetailCommon from "../../../common/detailCommon";
import "../../webtest/webStyle.scss"
import {Breadcrumb} from "antd";

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
        props.history.push("/repository/web-scene-instance")
    }

    const goBack = () =>{
        props.history.push("/repository/testcase")
    }

    return(
        <div className={"content-box-center"}>
            <Breadcrumb className={"breadcrumb-box"}>
                <Breadcrumb.Item onClick={goBack} className={"first-item"}>用例列表</Breadcrumb.Item>
                <Breadcrumb.Item>场景详情</Breadcrumb.Item>
            </Breadcrumb>

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
