import React, {useEffect, useState} from "react";
import {Breadcrumb} from "antd";
import {inject, observer} from "mobx-react";
import DetailCommon from "../../../../common/caseCommon/DetailCommon";
import WebPerformTestDrawer from "./webPerformTestDrawer";
import WebPerformDetailCommon from "./webPerformDetailCommon";
import {useHistory, useParams} from "react-router";
import {DrawerCloseIcon} from "../../../common/BreadcrumbCommon";


const WebPerformDetail = (props) =>{
    const {webPerfStore} = props;
    const {findWebPerf,updateWebPerf} = webPerfStore;


    const [detailInfo,setDetailInfo]=useState();
    const history = useHistory();
    let {id} = useParams()
    let webPerfId = sessionStorage.getItem("webPerfId") || id;

    useEffect(()=>{
        //获取路由id存入
        sessionStorage.setItem('webPerfId',id);

        findWebPerf(webPerfId).then(res=>{
            setDetailInfo(res);
        })
    },[webPerfId])
    
    const updateTitle = (value) =>{
        const param = {
            id:detailInfo.id,
            testCase: {
                ...detailInfo.testCase,
                name:value,
            }
        }
        updateWebPerf(param).then(()=>{
            findWebPerf(webPerfId).then(res=>{
                setDetailInfo(res);
            })
        })
    }

    //去往历史页
    const toHistory = () =>{
        history.push("/project/web-perform-instance")
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
                test={<WebPerformTestDrawer />}
            />
            <WebPerformDetailCommon  type={true} {...props}/>
        </div>
    )
}
export default inject("webPerfStore")(observer(WebPerformDetail));