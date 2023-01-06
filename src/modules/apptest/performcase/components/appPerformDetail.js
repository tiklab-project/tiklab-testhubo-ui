import React, {useEffect, useState} from "react";
import {Button, Tabs} from "antd";
import {inject, observer} from "mobx-react";
import AppPerfStepList from "./appPerfStepList";
import AppPerformCofig from "./appPerformCofig";
import DetailCommon from "../../../common/detailCommon";
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

    const tabItems = [
        { label: '场景配置', key: 'item-1', children: <AppPerfStepList /> }, // 务必填写 key
        { label: '压力配置', key: 'item-2', children: <AppPerformCofig /> },
    ];

    return(
        <>
            <DetailCommon
                detailInfo={detailInfo}
                updateTitle={updateTitle}
            />
            <Tabs defaultActiveKey="1"  items={tabItems}/>
        </>
    )
}
export default inject("appPerfStore")(observer(AppPerformDetail));