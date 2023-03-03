
import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import WebSceneStepList from "./webSceneStepList";
import WebExecuteTestDrawer from "./webExecuteTestDrawer";
import DetailCommon from "../../../../common/DetailCommon";
import "./webStyle.scss"
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
        updateWebScene(param).then(()=>{
            findWebScene(webSceneId).then(res=>{
                setDetailInfo(res);
            })
        })
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
                <Breadcrumb.Item onClick={goBack} className={"first-item"}>测试用例</Breadcrumb.Item>
                <Breadcrumb.Item>{detailInfo?.testCase.name}</Breadcrumb.Item>
            </Breadcrumb>

            <DetailCommon
                type={true}
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
