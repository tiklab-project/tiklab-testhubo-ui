/**
 * @description：
 * @date: 2021-09-02 13:08
 */
import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import AppSceneStepList from "./appSceneStepList";
import AppExecuteTestDrawer from "./appExecuteTestDrawer";
import DetailCommon from "../../../common/detailCommon";
import {Breadcrumb} from "antd";
import "./appStyle.scss"

const AppSceneDetail = (props) => {
    const {appSceneStore} = props;
    const {findAppScene,updateAppScene} = appSceneStore;

    const [detailInfo,setDetailInfo]=useState();
    const appSceneId = sessionStorage.getItem('appSceneId');

    useEffect(()=> {
        findAppScene(appSceneId).then(res=>{
            setDetailInfo(res);
        })
    },[appSceneId])

    //更新名称
    const updateTitle = (value) =>{
        const param = {
            id:detailInfo.id,
            testCase: {
                ...detailInfo.testCase,
                name:value,
            }
        }
        updateAppScene(param).then(()=>{
            findAppScene(appSceneId).then(res=>{
                setDetailInfo(res);
            })
        })
    }


    const toHistory = () =>{
        props.history.push("/repository/app-scene-instance")
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
                    <AppExecuteTestDrawer
                        appSceneId={appSceneId}
                        appSceneStore={appSceneStore}
                    />
                }
            />
            <AppSceneStepList />
        </div>

    )
}

export default inject('appSceneStore')(observer(AppSceneDetail));
