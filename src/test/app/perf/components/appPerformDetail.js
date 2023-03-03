import React, {useEffect, useState} from "react";
import {Breadcrumb} from "antd";
import {inject, observer} from "mobx-react";
import DetailCommon from "../../../../common/DetailCommon";
import AppPerformTestDrawer from "./appPerformTestDrawer";
import AppPerformDetailCommon from "./appPerformDetailCommon";

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
        updateAppPerf(param).then(()=>{
            findAppPerf(appPerfId).then(res=>{
                setDetailInfo(res);
            })
        })
    }

    const goBack = () =>{
        props.history.push("/repository/testcase")
    }

    //去往历史页
    const toHistory = () =>{
        props.history.push("/repository/app-perform-instance")
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
                test={ <AppPerformTestDrawer />}
            />
            <AppPerformDetailCommon type={true} {...props}/>
        </div>
    )
}
export default inject("appPerfStore")(observer(AppPerformDetail));