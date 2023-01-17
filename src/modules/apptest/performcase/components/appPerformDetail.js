import React, {useEffect, useState} from "react";
import {Button, Space, Tabs} from "antd";
import {inject, observer} from "mobx-react";
import AppPerfStepList from "./appPerfStepList";
import AppPerformCofig from "./appPerformCofig";
import DetailCommon from "../../../common/detailCommon";
import AppPerformTestDrawer from "./appPerformTestDrawer";

const { TabPane } = Tabs;

const AppPerformDetail = (props) =>{
    const {appPerfStore} = props;
    const {findAppPerf,updateAppPerf} = appPerfStore;

    const [detailInfo,setDetailInfo]=useState();

    let appPerfId = sessionStorage.getItem("appPerfId")

    useEffect(()=>{
        findAppPerf(appPerfId).then(res=>{
            setDetailInfo(res);
        })
    },[appPerfId])


    const updateTitle = (value) =>{
        const param = {
            id:detailInfo.id,
            testCase: {
                ...detailInfo.testCase,
                name:value,
            }
        }
        updateAppPerf(param)
    }


    //去往历史页
    const toHistory = () =>{
        props.history.push("/repositorypage/testcase/app-perform-instance")
    }

    //tab切换项
    const tabItems = [
        { label: '场景配置', key: '1', children: <AppPerfStepList /> }, // 务必填写 key
        { label: '压力配置', key: '2', children: <AppPerformCofig {...props} /> },
    ];

    return(
        <div className={"content-box-center"}>
            <DetailCommon
                detailInfo={detailInfo}
                updateTitle={updateTitle}
                toHistory={toHistory}
                test={ <AppPerformTestDrawer />}
            />
            <Tabs defaultActiveKey="1"  items={tabItems}/>
        </div>
    )
}
export default inject("appPerfStore")(observer(AppPerformDetail));