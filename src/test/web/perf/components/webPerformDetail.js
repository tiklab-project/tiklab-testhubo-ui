import React, {useEffect, useState} from "react";
import {Breadcrumb} from "antd";
import {inject, observer} from "mobx-react";
import DetailCommon from "../../../../common/DetailCommon";
import WebPerformTestDrawer from "./webPerformTestDrawer";
import WebPerformDetailCommon from "./webPerformDetailCommon";


const WebPerformDetail = (props) =>{
    const {webPerfStore} = props;
    const {findWebPerf,updateWebPerf} = webPerfStore;


    const [detailInfo,setDetailInfo]=useState();

    let webPerfId = sessionStorage.getItem("webPerfId")

    useEffect(()=>{
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
        props.history.push("/repository/web-perform-instance")
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
                test={<WebPerformTestDrawer />}
            />
            <WebPerformDetailCommon  type={true} {...props}/>
        </div>
    )
}
export default inject("webPerfStore")(observer(WebPerformDetail));