import React, {useEffect, useState} from "react";
import {Breadcrumb} from "antd";
import {inject, observer} from "mobx-react";
import DetailCommon from "../../../../common/caseCommon/DetailCommon";
import AppPerformTestDrawer from "./appPerformTestDrawer";
import AppPerformDetailCommon from "./appPerformDetailCommon";
import {useHistory, useParams} from "react-router";
import {DrawerCloseIcon} from "../../../common/BreadcrumbCommon";

const AppPerformDetail = (props) =>{
    const {appPerfStore} = props;
    const {findAppPerf,updateAppPerf} = appPerfStore;

    const [detailInfo,setDetailInfo]=useState();
    const history = useHistory();
    let {id} = useParams()
    let appPerfId = sessionStorage.getItem("appPerfId") || id;

    useEffect(()=>{
        //获取路由id存入
        sessionStorage.setItem('appPerfId',id);

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



    //去往历史页
    const toHistory = () =>{
        history.push("/project/app-perform-instance")
    }


    return(
        <div className={"content-box-center"}>
            <div className={"breadcrumb-title_between"}>
                <Breadcrumb className={"breadcrumb-box"}>
                    <Breadcrumb.Item>用例详情</Breadcrumb.Item>
                </Breadcrumb>
                <DrawerCloseIcon />
            </div>
            <DetailCommon
                type={true}
                detailInfo={detailInfo}
                updateCase={updateCase}
                toHistory={toHistory}
                test={ <AppPerformTestDrawer />}
            />
            <AppPerformDetailCommon type={true} {...props}/>
        </div>
    )
}
export default inject("appPerfStore")(observer(AppPerformDetail));